// Page behaviour, carried over from the original design file "Admissions.dc.html".
/* eslint-disable */
import { DCLogic } from '../../dc/runtime.js';
import { collectForm, sendEnquiry, toast } from '../../lib/site.js';

class AdmissionsPageLogic extends DCLogic {
  state = { fees: false, faq: null, sent: false };

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
    return {
      langValue: this.seedLang(),
      pickLang: (e) => { const v = e.target.value; if (window.AG_I18N) window.AG_I18N.set(v); this.setState({ lang: v }); },
      feesOpen: !!this.state.fees,
      feeToggleLabel: this.state.fees ? 'Hide what it covers' : 'What the fee covers →',
      toggleFees: () => this.setState(s => ({ fees: !s.fees })),
      sent: !!this.state.sent,
      notSent: !this.state.sent,
      submit: (e) => {
        e.preventDefault();
        const fields = collectForm(e.currentTarget);
        sendEnquiry('admission', fields)
          .then((r) => this.setState({ sent: true, ref: r.reference }))
          .catch((err) => toast(err.message, true));
      },
      resetForm: () => this.setState({ sent: false }),
      steps: [
        { n: '01', title: 'Enquire', body: 'Leave your details here or telephone the office. We will call back within two working days.' },
        { n: '02', title: 'Visit a morning', body: 'Come while classes are running. You will see the recitation period, meet the acharyas and walk the campus.' },
        { n: '03', title: 'Apply', body: 'Submit the form with the documents listed below. Children joining above Grade 1 sit a short interaction.' },
        { n: '04', title: 'Confirm the seat', body: 'Offers are made within a week of the interaction. The seat is held once the first instalment is paid.' }
      ],
      eligibility: [
        { cls: 'Nursery', age: '3 years', seats: '20' },
        { cls: 'LKG', age: '4 years', seats: '20' },
        { cls: 'UKG', age: '5 years', seats: '20' },
        { cls: 'Grade 1 – 5', age: '6 – 10 years', seats: 'Limited' },
        { cls: 'Grade 6 – 10', age: '11 – 15 years', seats: 'On interaction' }
      ],
      documents: [
        { text: "Child's birth certificate (original and a copy)" },
        { text: 'Aadhaar of the child and both parents' },
        { text: 'Transfer certificate from the previous school, for Grade 1 and above' },
        { text: 'Report card for the last two years, where applicable' },
        { text: 'Four passport photographs of the child' },
        { text: 'Address proof and, if applicable, the caste or category certificate' }
      ],
      fees: [
        { stage: 'Nursery – UKG', amount: '₹ 48,000', note: 'Per year, payable in two instalments. Includes books and the midday meal.' },
        { stage: 'Grade 1 – 5', amount: '₹ 62,000', note: 'Per year, payable in two instalments. Includes books, meal and the Sanskrit course.' },
        { stage: 'Grade 6 – 10', amount: '₹ 78,000', note: 'Per year, payable in two instalments. Board registration billed at cost.' }
      ],
      feeIncludes: [
        { text: 'Tuition, including the Sanskrit and Veda periods' },
        { text: 'Textbooks, notebooks and stationery' },
        { text: 'The midday meal, cooked on the premises' },
        { text: 'Music, art, yoga and games' },
        { text: 'Library and laboratory use' },
        { text: 'Festival days and the annual recitation evening' }
      ],
      dates: [
        { when: '1 October', what: 'Enquiries open for the following academic year' },
        { when: '15 November', what: 'Application forms available at the office' },
        { when: '10 January', what: 'Interactions for Grade 1 and above' },
        { when: '1 February', what: 'Offers made; seats confirmed on payment' }
      ],
      faqs: [
        ['Does my child need to know Sanskrit before joining?', 'No. Sanskrit is taught from the beginning, by ear before by grammar. Children who join in later grades are given additional support to catch up with their class.'],
        ['Is there an entrance examination?', 'Not for Nursery to UKG. From Grade 1 upwards there is a short interaction — a conversation, some reading and a little arithmetic — to place the child correctly, not to filter.'],
        ['Which board does the school follow for Grade 10?', 'The state board, taken alongside the traditional curriculum. Send us your question about board choice and the principal will answer it directly.'],
        ['Can we visit before applying?', 'Yes, and we would prefer it. Weekday mornings while classes are running are best. Telephone the office a day ahead so an acharya is free to walk you through.']
      ].map((f, i) => ({
        q: f[0], a: f[1],
        open: this.state.faq === i,
        sign: this.state.faq === i ? '–' : '+',
        toggle: () => this.setState(s => ({ faq: s.faq === i ? null : i }))
      }))
    };
  }
}

export default AdmissionsPageLogic;
