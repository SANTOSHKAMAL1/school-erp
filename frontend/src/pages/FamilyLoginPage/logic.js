// Page behaviour, carried over from the original design file "Family Login.dc.html".
/* eslint-disable */
import { DCLogic } from '../../dc/runtime.js';
import { api, setMe } from '../../portal/api.js';
import { go } from '../../lib/nav.js';

const ROLES = [
  { id: 'parent', label: 'Parent / Student', title: 'Family login', sub: 'Use the admission number (Family ID) or the mobile number registered with the school office.', idLabel: 'Mobile number or Family ID', ph: '98xxxxxxxx or AG2026…', word: 'Family portal' },
  { id: 'teacher', label: 'Teacher', title: 'Teacher login', sub: 'Use the staff login ID given to you by your HOD.', idLabel: 'Staff login ID', ph: 't.yourname', word: 'Staff portal' },
  { id: 'hod', label: 'HOD', title: 'HOD login', sub: 'Heads of department sign in with the ID issued by the administrator.', idLabel: 'Staff login ID', ph: 'hod.department', word: 'Staff portal' },
  { id: 'superadmin', label: 'Admin', title: 'Administrator login', sub: 'For the school office. Manages the website, staff, fees and records.', idLabel: 'Admin login ID', ph: 'superadmin', word: 'Administration' },
];
function initialRole() {
  try {
    const m = (window.location.search || '').match(/[?&]as=(parent|teacher|hod|superadmin|admin)/);
    if (m) return m[1] === 'admin' ? 'superadmin' : m[1];
    return localStorage.getItem('ag-login-role') || 'parent';
  } catch (e) { return 'parent'; }
}

class FamilyLoginPageLogic extends DCLogic {
  state = {
    role: initialRole(),
    id: '',
    pw: '',
    show: false,
    remember: true,
    error: '',
    busy: false,
    forgot: false,
    otpStep: 1, // 1 = request otp, 2 = verify otp, 3 = success
    otpLoginOrEmail: '',
    otpCode: '',
    otpNewPassword: '',
    otpMaskedEmail: '',
    otpError: '',
    otpSuccessMsg: '',
    otpBusy: false,
  };

  requestOtp(e) {
    if (e && e.preventDefault) e.preventDefault();
    const target = (this.state.otpLoginOrEmail || this.state.id || '').trim();
    if (!target) {
      this.setState({ otpError: 'Enter your Login ID, Admission No, or Email.' });
      return;
    }
    this.setState({ otpBusy: true, otpError: '' });
    api.post('/api/auth/forgot-password/request-otp', { login_or_email: target })
      .then((res) => {
        this.setState({
          otpBusy: false,
          otpStep: 2,
          otpMaskedEmail: res.masked_email || '',
          otpSuccessMsg: res.message || 'OTP sent successfully!',
          otpError: '',
        });
      })
      .catch((err) => {
        this.setState({ otpBusy: false, otpError: err.message || 'Failed to send OTP.' });
      });
  }

  verifyOtpAndReset(e) {
    if (e && e.preventDefault) e.preventDefault();
    const target = (this.state.otpLoginOrEmail || this.state.id || '').trim();
    const code = (this.state.otpCode || '').trim();
    const newPw = this.state.otpNewPassword || '';
    if (!code) {
      this.setState({ otpError: 'Enter the 6-digit OTP code.' });
      return;
    }
    if (!newPw || newPw.length < 8) {
      this.setState({ otpError: 'Password must be at least 8 characters long.' });
      return;
    }
    this.setState({ otpBusy: true, otpError: '' });
    api.post('/api/auth/forgot-password/verify-otp', {
      login_or_email: target,
      otp: code,
      new_password: newPw,
    })
      .then((res) => {
        this.setState({
          otpBusy: false,
          otpStep: 3,
          otpSuccessMsg: res.message || 'Password reset successful!',
          pw: newPw,
          id: target,
          otpError: '',
        });
      })
      .catch((err) => {
        this.setState({ otpBusy: false, otpError: err.message || 'Failed to reset password.' });
      });
  }

  signIn(e) {
    if (e && e.preventDefault) e.preventDefault();
    const id = (this.state.id || '').trim();
    const pw = this.state.pw || '';
    if (!id || !pw) { this.setState({ error: 'Enter your ID and password.' }); return; }
    this.setState({ busy: true, error: '' });
    api.post('/api/auth/login', { login: id, password: pw, remember: !!this.state.remember, role: this.state.role })
      .then((me) => { setMe(me); go('/portal'); })
      .catch((err) => this.setState({ busy: false, error: err.message }));
  }


  seedLang() {
    if (this.state.lang) return this.state.lang;
    if (typeof window === 'undefined') return 'en';
    if (window.__AG_I18N_CHOSEN) return window.__AG_I18N_CHOSEN;
    var m = (window.location.search || '').match(/[?&]lang=([a-z]{2})/i);
    if (m) return m[1].toLowerCase();
    try { return localStorage.getItem('ag-lang') || 'en'; } catch (e) { return 'en'; }
  }

  componentDidMount() {
    var self = this;
    api.get('/api/auth/session').then((r) => { if (r && r.user) { setMe(r.user); go('/portal', { replace: true }); } }).catch(() => {});
    /* the translation layer is a helmet script — wait for it rather than guessing */
    var tries = 0;
    var hook = setInterval(function () {
      tries++;
      if (window.AG_I18N && window.AG_I18N.subscribe) {
        clearInterval(hook);
        window.AG_I18N.subscribe(function (l) {
          if (l !== self.state.lang) self.setState({ lang: l });
        });
      } else if (tries > 40) {
        clearInterval(hook);
      }
    }, 100);
    this.langHook = hook;
  }

  componentWillUnmount() {
    clearInterval(this.langHook);
  }

  renderVals() {
    const R = ROLES.find((r) => r.id === this.state.role) || ROLES[0];
    return {
      langValue: this.seedLang(),
      pickLang: (e) => { const v = e.target.value; if (window.AG_I18N) window.AG_I18N.set(v); this.setState({ lang: v }); },
      atLogin: true,
      atPortal: false,
      roles: ROLES.map((r) => {
        const on = r.id === R.id;
        return {
          id: r.id, label: r.label, on,
          bg: on ? 'var(--color-accent-900)' : 'transparent',
          fg: on ? 'var(--color-accent-2-100)' : 'var(--color-accent-900)',
          border: on ? 'var(--color-accent-900)' : 'color-mix(in srgb, var(--color-accent-900) 30%, transparent)',
          pick: () => { try { localStorage.setItem('ag-login-role', r.id); } catch (e) {} this.setState({ role: r.id, error: '' }); },
        };
      }),
      portalWord: R.word,
      loginTitle: R.title,
      loginSub: R.sub,
      idLabel: R.idLabel,
      idPlaceholder: R.ph,
      idValue: this.state.id,
      pwValue: this.state.pw,
      pwType: this.state.show ? 'text' : 'password',
      remember: !!this.state.remember,
      hasError: !!this.state.error,
      errorText: this.state.error,
      busy: !!this.state.busy,
      submitLabel: this.state.busy ? 'Signing in…' : 'Sign in',
      forgot: !!this.state.forgot,
      toggleForgot: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.setState((s) => ({
          forgot: !s.forgot,
          otpStep: 1,
          otpLoginOrEmail: s.id || '',
          otpCode: '',
          otpNewPassword: '',
          otpError: '',
          otpSuccessMsg: '',
        }));
      },
      otpStep: this.state.otpStep,
      otpLoginOrEmail: this.state.otpLoginOrEmail || this.state.id || '',
      setOtpLoginOrEmail: (e) => this.setState({ otpLoginOrEmail: e.target.value, otpError: '' }),
      otpCode: this.state.otpCode,
      setOtpCode: (e) => this.setState({ otpCode: e.target.value, otpError: '' }),
      otpNewPassword: this.state.otpNewPassword,
      setOtpNewPassword: (e) => this.setState({ otpNewPassword: e.target.value, otpError: '' }),
      otpMaskedEmail: this.state.otpMaskedEmail,
      otpError: this.state.otpError,
      otpSuccessMsg: this.state.otpSuccessMsg,
      otpBusy: this.state.otpBusy,
      requestOtp: (e) => this.requestOtp(e),
      verifyOtpAndReset: (e) => this.verifyOtpAndReset(e),
      resetToStep1: () => this.setState({ otpStep: 1, otpError: '', otpSuccessMsg: '' }),
      setId: (e) => this.setState({ id: e.target.value, error: '' }),
      setPw: (e) => this.setState({ pw: e.target.value, error: '' }),
      togglePw: () => this.setState(s => ({ show: !s.show })),
      toggleRemember: () => this.setState(s => ({ remember: !s.remember })),
      signIn: (e) => this.signIn(e),
      noSubmit: (e) => e.preventDefault(),
    };

  }
}

export default FamilyLoginPageLogic;
