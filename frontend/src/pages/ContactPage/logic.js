// Page behaviour, carried over from the original design file "Contact.dc.html".
/* eslint-disable */
import { DCLogic } from '../../dc/runtime.js';
import { collectForm, sendEnquiry, toast } from '../../lib/site.js';

class ContactPageLogic extends DCLogic {
  state = { name: '', phone: '', note: '', touched: {}, summary: false, sent: false, ref: '' };

  nameOk() { return (this.state.name || '').trim().length > 1; }
  phoneOk() { return /^[0-9]{10}$/.test((this.state.phone || '').replace(/\s|-/g, '')); }

  submit(e) {
    e.preventDefault();
    if (!this.nameOk() || !this.phoneOk()) {
      this.setState({ touched: { name: true, phone: true }, summary: true });
      return;
    }
    const fields = { ...collectForm(e.currentTarget), 'Your name': this.state.name, 'Phone': this.state.phone, 'Note': this.state.note };
    sendEnquiry('contact', fields)
      .then((r) => this.setState({ sent: true, summary: false, ref: r.reference }))
      .catch((err) => toast(err.message, true));
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
    const t = this.state.touched || {};
    const nameBad = !!t.name && !this.nameOk();
    const phoneBad = !!t.phone && !this.phoneOk();
    const len = (this.state.note || '').length;
    const bad = 'var(--color-accent)';
    const icons = {
      pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.8"></circle>',
      phone: '<path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3Z"></path>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="m3.8 7 8.2 6 8.2-6"></path>',
      clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7.5V12l3.5 2"></path>'
    };
    return {
      langValue: this.seedLang(),
      pickLang: (e) => { const v = e.target.value; if (window.AG_I18N) window.AG_I18N.set(v); this.setState({ lang: v }); },
      directions: [
        { mode: 'By road', note: 'Off Pampa Mahakavi Road, inside the Uttaradi Math compound. The gate is beside the math entrance.' },
        { mode: 'Nearest metro', note: 'National College station, about a ten-minute walk. Placeholder — confirm with the office.' },
        { mode: 'Bus', note: 'Routes stopping at Basavanagudi and Shankarapuram. Placeholder pending the school\u2019s note.' },
        { mode: 'Parking', note: 'Limited space inside the compound; street parking on the approach road in the mornings.' }
      ],
      desks: [
        { name: 'Admissions', scope: 'Applications, eligibility, visits and fee queries for new families.', reach: 'admissions@arundhatigurukulam.in' },
        { name: 'School office', scope: 'Attendance, certificates, transport and day-to-day matters.', reach: '+91 96860 52212' },
        { name: 'Accounts', scope: 'Fee instalments, receipts and refunds.', reach: 'accounts@arundhatigurukulam.in' },
        { name: 'Principal\u2019s office', scope: 'Academic matters and anything the office cannot settle.', reach: 'By appointment through the office' }
      ],
      hours: [
        { when: 'Mon – Fri', what: 'Visits from 9 am, best before the midday break' },
        { when: 'Saturday', what: 'Office open until noon; no classes running' },
        { when: 'Telephone', what: '9 am to 4 pm on working days' }
      ],
      nameValue: this.state.name,
      phoneValue: this.state.phone,
      noteValue: this.state.note,
      nameBad, phoneBad,
      nameBorder: nameBad ? bad : 'var(--color-divider)',
      phoneBorder: phoneBad ? bad : 'var(--color-divider)',
      countLabel: len > 400 ? (len + ' / 500') : '',
      countColor: len > 500 ? bad : 'var(--color-neutral-700)',
      showSummary: !!this.state.summary,
      setName: (e) => this.setState({ name: e.target.value, summary: false }),
      setPhone: (e) => this.setState({ phone: e.target.value, summary: false }),
      setNote: (e) => this.setState({ note: e.target.value.slice(0, 500) }),
      touchName: () => this.setState(s => ({ touched: Object.assign({}, s.touched, { name: true }) })),
      touchPhone: () => this.setState(s => ({ touched: Object.assign({}, s.touched, { phone: true }) })),
      submit: (e) => this.submit(e),
      sent: !!this.state.sent,
      notSent: !this.state.sent,
      ref: this.state.ref,
      reset: () => this.setState({ sent: false, name: '', phone: '', note: '', touched: {}, ref: '' })
    };
  }
}

export default ContactPageLogic;
