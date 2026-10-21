// Page behaviour, carried over from the original design file "Mandatory Disclosure.dc.html".
/* eslint-disable */
import { DCLogic } from '../../dc/runtime.js';

class DisclosurePageLogic extends DCLogic {
  state = { lang: '', open: {}, docs: {}, text: {}, viewer: null, playVideo: false };

  seedLang() {
    if (this.state.lang) return this.state.lang;
    if (typeof window === 'undefined') return 'en';
    if (window.__AG_I18N_CHOSEN) return window.__AG_I18N_CHOSEN;
    var m = (window.location.search || '').match(/[?&]lang=([a-z]{2})/i);
    return m ? m[1].toLowerCase() : 'en';
  }

  componentDidMount() {
    var self = this;
    // Documents and text saved through the admin page (Vercel Blob). The
    // values and built-in files below are used when nothing is saved for a row.
    try {
      fetch('/api/disclosure-docs', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { if (j) self.setState({ docs: j.docs || {}, text: j.text || {} }); })
        .catch(function () {});
    } catch (e) {}
    this.onKey = function (e) { if (e.key === 'Escape' && self.state.viewer) self.setState({ viewer: null }); };
    window.addEventListener('keydown', this.onKey);
    var tries = 0;
    this.langHook = setInterval(function () {
      tries++;
      if (window.AG_I18N && window.AG_I18N.subscribe) {
        clearInterval(self.langHook);
        window.AG_I18N.subscribe(function (l) { if (l !== self.state.lang) self.setState({ lang: l }); });
      } else if (tries > 40) {
        clearInterval(self.langHook);
      }
    }, 100);
  }

  componentWillUnmount() { clearInterval(this.langHook); window.removeEventListener('keydown', this.onKey); }

  renderVals() {
    const TBU = 'To be updated';
    const DASH = '—';
    // Text and PDFs saved through the admin page win over the values written
    // here. A row given 'PDF' expects a document and shows "PDF to be added"
    // until one is uploaded; any other row shows its text plus any PDF.
    const saved = this.state.text || {};
    const uploaded = this.state.docs || {};
    // Files shipped with the site; an upload for the same row takes precedence.
    const BUILT_IN = {
      B4: '/docs/water-test-report-july-2026.pdf',
      B7: '/docs/school-management-committee-2026-29.pdf',
      B8: '/docs/water-test-report-july-2026.pdf',
      B12: '/docs/fire-safety-recommendation-2026.pdf',
      C3: '/docs/school-management-committee-2026-29.pdf'
    };
    const textFor = (key, fallback) => (Object.prototype.hasOwnProperty.call(saved, key) ? String(saved[key]) : fallback).trim();
    const fill = (r, fallback) => {
      const doc = fallback === 'PDF';
      const up = uploaded[r.key];
      const href = up ? up.url : (BUILT_IN[r.key] || '');
      const dl = up ? (up.downloadUrl || up.url) : href;
      let value = textFor(r.key, doc ? '' : fallback);
      // A bare dash next to a PDF says nothing; show just the PDF.
      if (href && /^[-–—\s]*$/.test(value)) value = '';
      r.value = value; r.href = href; r.dl = dl;
      r.isText = !!value; r.hasPdf = !!href; r.noPdf = doc && !href && !value;
      r.color = value === TBU ? 'var(--color-neutral-700)' : 'var(--color-text)';
      r.open = () => this.setState({ viewer: { title: r.title, href: href, dl: dl } });
      return r;
    };
    const section = (sec) => (n, title, value, note) =>
      fill({ key: sec + n, n: String(n), title, note: note || '', hasNote: !!note }, value);
    const A = section('A'), B = section('B'), C = section('C'), E = section('E');

    const general = [
      A(1, 'Name of the School', 'Arundhati Gurukulam'),
      A(2, 'Affiliation No. (if applicable)', 'Not Applicable'),
      A(3, 'School Code (if applicable)', 'Not Applicable'),
      A(4, 'Complete Address with Pin Code', 'No.2, Raghavasadanam, Pampa Mahakavi Road, Shankarapuram, Basavanagudi, Bengaluru – 560004, Karnataka'),
      A(5, 'Principal Name & Qualification', 'Ms. Sudha Prasad, B.E., B.Ed.'),
      A(6, 'School Email ID', 'office@arundhatigurukulam.in'),
      A(7, 'Contact Details (Landline / Mobile)', '+91 96860 52212')
    ];
    const documents = [
      B(1, 'Copies of Affiliation / Upgradation Letter and recent Extension of Affiliation, if any', 'Not Applicable'),
      B(2, 'Copies of Societies / Trust / Company Registration / Renewal Certificate, as applicable', 'PDF'),
      B(3, 'Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt. / UT', 'PDF'),
      B(4, 'Copies of Recognition Certificate under RTE Act, 2009, and its renewal if applicable', 'PDF'),
      B(5, 'Copy of valid Building Safety Certificate as per the National Building Code', 'PDF'),
      B(6, 'Copy of valid Fire Safety Certificate issued by the Competent Authority', 'PDF'),
      B(7, 'Copy of the DEO Certificate submitted by the school for Affiliation / Upgradation / Extension of Affiliation, or Self Certification by the School', 'PDF'),
      B(8, 'Copies of valid Drinking Water, Health and Sanitation Certificates and Water Testing Report', 'PDF', 'Safe Drinking Water and Sanitary Condition Certificate (Annexure-C), issued by Public Health Department (PHED) / Authorized Officer of the Local Body (Municipality)'),
    ];
    const academics = [
      C(1, 'Fee Structure of the School', 'PDF', 'Grade wise school fees details'),
      C(2, 'Annual Academic Calendar', 'PDF'),
      C(3, 'List of School Management Committee (SMC)', 'PDF'),
      C(4, 'List of Parents Teachers Association (PTA) Members', 'PDF'),
      C(5, 'Last three-year result of the Board examination (as per applicability)', TBU)
    ];
    const results = [{ n: '1' }, { n: '2' }, { n: '3' }];
    // Staff rows carry two saved texts: '<key>.count' (number / strength) and
    // '<key>' (name and qualifications).
    const st = (key, n, title, count, names, sub) => {
      const r = fill({ key, n, title, weight: sub ? '400' : '600', indent: sub ? '34px' : '14px' }, names);
      r.count = textFor(key + '.count', count);
      return r;
    };
    const staff = [
      st('D1', '1', 'Principal', '1', 'Ms. Sudha Prasad, B.E., B.Ed.'),
      st('D2', '2', 'Vice Principal', DASH, DASH),
      st('D3', '3', 'Headmistress / Headmaster', DASH, DASH),
      st('D4', '4', 'Total No. of Teachers', '26', 'PDF'),
      st('D4PGT', '', 'PGT', '0', DASH, true),
      st('D4TGT', '', 'TGT', '5', 'PDF', true),
      st('D4PRT', '', 'PRT', '10', 'PDF', true),
      st('D5', '5', 'Teachers Section Ratio', '1 : 1.5', ''),
      st('D6', '6', 'Details of Special Educator', DASH, DASH),
      st('D7', '7', 'Details of Counsellor & Wellness Teacher', '1', 'Archana S, Graduation in Child Psychology')
    ];
    const infra = [
      E(1, 'Total Campus Area of the School (in sq. mtr.)', '3065 sq. mtr.'),
      E(2, 'No. and size of the Classrooms (in sq. mtr.)', '24 Classrooms, 47 sq. mtr.'),
      E(3, 'No. and size of Laboratories including Computer Labs (in sq. mtr.)', '3 Labs, 56 sq. mtr.'),
      E(4, 'No. and size of Library (in sq. mtr.)', '112.4127 sq. mtr.'),
      E(5, 'Internet Facility', 'Yes'),
      E(6, 'No. of Girls Toilets', '4'),
      E(7, 'No. of Boys Toilets', '4'),
      E(8, 'No. of CWSN Toilets', '2'),
      E(9, 'Link of YouTube video of the inspection of school covering the infrastructure of the school', 'https://youtu.be/ciymyJXLKCQ')
    ];
    // Row 9 holds a YouTube link; the video plays on this page instead of
    // sending visitors to YouTube.
    const video = infra[8];
    const ytm = video.value.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/);
    const videoId = ytm ? ytm[1] : '';
    const videoUrl = videoId ? 'https://www.youtube.com/watch?v=' + videoId : '';
    if (videoId) { video.isVideo = true; video.isText = false; }
    const photos = ['School Photo front view', 'Science Composite Lab', 'Math Lab', 'Library', 'Playground', 'Ramp/Lift', 'Toilets']
      .map((t, i) => {
        const up = uploaded['P' + (i + 1)];
        return { title: t, id: 'md-photo-' + (i + 12), src: up ? up.url : '' };
      });

    const v = this.state.viewer;

    return {
      general, documents, academics, results, staff, infra, photos,
      hasVideo: !!videoId,
      videoSrc: videoId ? 'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0&playsinline=1' + (this.state.playVideo ? '&autoplay=1' : '') : 'about:blank',
      videoFullScreen: true,
      playVideo: () => { window.open(videoUrl, '_blank', 'noopener,noreferrer'); },
      viewerOpen: !!v,
      viewerTitle: v ? v.title : '',
      viewerHref: v ? v.href : 'about:blank',
      viewerFrame: v ? v.href + '#view=FitH' : 'about:blank',
      viewerDl: v ? v.dl : '',
      closeViewer: () => this.setState({ viewer: null }),
      keepViewer: (e) => { if (e && e.stopPropagation) e.stopPropagation(); },
      oA: !!this.state.open.a,
      rA: this.state.open.a ? 'rotate(180deg)' : 'none',
      tA: () => this.setState(s => ({ open: Object.assign({}, s.open, { a: !s.open.a }) })),
      oB: !!this.state.open.b,
      rB: this.state.open.b ? 'rotate(180deg)' : 'none',
      tB: () => this.setState(s => ({ open: Object.assign({}, s.open, { b: !s.open.b }) })),
      oC: !!this.state.open.c,
      rC: this.state.open.c ? 'rotate(180deg)' : 'none',
      tC: () => this.setState(s => ({ open: Object.assign({}, s.open, { c: !s.open.c }) })),
      oD: !!this.state.open.d,
      rD: this.state.open.d ? 'rotate(180deg)' : 'none',
      tD: () => this.setState(s => ({ open: Object.assign({}, s.open, { d: !s.open.d }) })),
      oE: !!this.state.open.e,
      rE: this.state.open.e ? 'rotate(180deg)' : 'none',
      tE: () => this.setState(s => ({ open: Object.assign({}, s.open, { e: !s.open.e }) })),
      langValue: this.seedLang(),
      pickLang: (e) => { const v = e.target.value; if (window.AG_I18N) window.AG_I18N.set(v); this.setState({ lang: v }); }
    };
  }
}

export default DisclosurePageLogic;
