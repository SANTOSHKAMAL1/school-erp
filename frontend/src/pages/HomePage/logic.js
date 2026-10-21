// Page behaviour, carried over from the original design file "Arundhati Home.dc.html".
/* eslint-disable */
import { DCLogic } from '../../dc/runtime.js';
import { collectForm, loadSite, sendEnquiry, toast } from '../../lib/site.js';

class HomePageLogic extends DCLogic {
  state = { slide: 0, menu: null, welcome: 'in', nameIn: false, mobileOpen: false, w: (typeof window !== 'undefined' ? window.innerWidth : 1440) };

  componentDidMount() {
    // Content edited in the admin console (falls back to the values below).
    loadSite().then((site) => { if (site && !this.__gone) this.setState({ site }); });
    try {
      var m = (window.location.search || '').match(/[?&]lang=([a-z]{2})/i);
      var pre = window.__AG_I18N_CHOSEN && window.__AG_I18N_CHOSEN !== 'en' ? window.__AG_I18N_CHOSEN : '';
      if (m) this.setState({ lang: m[1].toLowerCase() });
      else if (pre) this.setState({ lang: pre });
    } catch (e) {}

    var seen = false;
    try { seen = !!window.__AG_NAV || /[?&]nav=1/.test(window.location.search || ''); } catch (e) {}
    if (seen) {
      this.setState({ welcome: 'gone' });
      this.noticeTimer = setTimeout(() => { if (!window.__AG_EDITING) this.setState({ notice: true }); }, 1200);
    }

    this.timer = setInterval(() => {
      if (this.state.welcome !== 'gone') return;
      this.setState(s => ({ slide: (s.slide + 1) % 3 }));
    }, 5200);

    this.prevOverflow = document.body.style.overflow;
    if (!seen) {
      document.body.style.overflow = 'hidden';
      if (window.scrollTo) window.scrollTo(0, 0);
    }

    this.nameTimer = setTimeout(() => this.setState({ nameIn: true }), 1500);

    this.dismiss = () => {
      if (this.state.welcome !== 'in') return;
      this.setState({ welcome: 'out' });
      document.body.style.overflow = this.prevOverflow || '';
      this.unbind();
      var muted = !!this.noticeMuted;
      this.gone = setTimeout(() => this.setState({ welcome: 'gone' }), 900);
      if (!muted) this.noticeTimer = setTimeout(() => { if (!window.__AG_EDITING) this.setState({ notice: true }); }, 1600);
    };
    this.onKey = (e) => {
      if ([' ', 'Enter', 'ArrowDown', 'PageDown', 'End'].indexOf(e.key) > -1) this.dismiss();
    };
    this.onWheel = (e) => { if (e.deltaY > 0) this.dismiss(); };
    this.onScroll = () => { if (window.scrollY > 4) this.dismiss(); };
    this.unbind = () => {
      window.removeEventListener('wheel', this.onWheel, { passive: true });
      window.removeEventListener('touchmove', this.dismiss, { passive: true });
      window.removeEventListener('keydown', this.onKey);
      window.removeEventListener('scroll', this.onScroll);
    };
    if (!seen) {
      window.addEventListener('wheel', this.onWheel, { passive: true });
      window.addEventListener('touchmove', this.dismiss, { passive: true });
      window.addEventListener('keydown', this.onKey);
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }

    this.counted = false;
    this.maybeCount = () => {
      if (this.counted) return;
      const el = document.querySelector('[data-counters]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) { this.counted = true; this.runCount(); }
    };
    window.addEventListener('scroll', this.maybeCount, { passive: true });
    document.addEventListener('visibilitychange', this.maybeCount);
    this.countHook = setInterval(this.maybeCount, 400);

    this.onResize = () => this.setState({ w: window.innerWidth });
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    this.__gone = true;
    clearInterval(this.timer);
    clearTimeout(this.nameTimer);
    clearTimeout(this.gone);
    clearTimeout(this.noticeTimer);
    window.removeEventListener('resize', this.onResize);
    clearInterval(this.countHook);
    if (this.maybeCount) {
      window.removeEventListener('scroll', this.maybeCount);
      document.removeEventListener('visibilitychange', this.maybeCount);
    }
    clearInterval(this.tween);
    clearTimeout(this.countSafety);
    if (this.unbind) this.unbind();
    document.body.style.overflow = this.prevOverflow || '';
  }

  go(n) { this.setState({ slide: n }); }

  runCount() {
    const targets = [350, 24, 20, 9, 3];
    const clock = () => (window.performance && window.performance.now) ? window.performance.now() : Date.now();
    const t0 = clock();
    const suffix = ['+', '', '', ':1', ''];
    const paint = (vals) => {
      for (let k = 0; k < vals.length; k++) {
        const el = document.querySelector('[data-count="' + k + '"]');
        if (el) el.textContent = vals[k] + suffix[k];
      }
    };
    const tween = setInterval(() => {
      const p = Math.min(1, (clock() - t0) / 1500);
      const e = 1 - Math.pow(1 - p, 3);
      const vals = targets.map(v => Math.round(v * e));
      paint(vals);
      this.setState({ counts: vals });
      if (p >= 1) clearInterval(tween);
    }, 50);
    this.paintCounts = paint;
    this.tween = tween;
    this.countSafety = setTimeout(() => {
      clearInterval(this.tween);
      paint(targets);
      this.setState({ counts: targets.slice() });
    }, 1800);
  }

  menus() {
    return {
      about: {
        kicker: 'Who we are', title: 'About the Gurukulam',
        blurb: 'A day school in the Uttaradi Math compound at Shankarapuram, where the Indian knowledge traditions and a modern academic curriculum are taught as one thing.',
        cta: 'Read our story', href: '#story',
        groups: [
          { label: 'Our institution', items: [
            { label: 'Our Story', href: '#story' },
            { label: 'Vision, Mission & Values', href: '#pillars' },
            { label: "Founder's Message", href: '#story' }
          ]},
          { label: 'Our people', items: [
            { label: 'Faculty', href: '#story' },
            { label: 'Careers', href: '/contact' }
          ]}
        ]
      },
      academics: {
        kicker: 'How we teach', title: 'One timetable, two inheritances',
        blurb: 'The morning belongs to recitation and Sanskrit. The rest of the day runs the standard academic subjects, with the arts, yoga and games woven in rather than added on.',
        cta: 'Explore the curriculum', href: '#learning',
        groups: [
          { label: 'Curriculum', items: [
            { label: 'Sanskrit & Veda', href: '#learning' },
            { label: 'Academic Subjects', href: '#learning' },
            { label: 'Assessment', href: '#learning' }
          ]},
          { label: 'Learning spaces', items: [
            { label: 'Library', href: '#learning' },
            { label: 'Art & Music Room', href: '#life' },
            { label: 'Play Area', href: '#life' }
          ]},
          { label: 'Beyond the classroom', items: [
            { label: 'Clubs & Societies', href: '#life' },
            { label: 'Field Trips', href: '#life' },
            { label: 'Summer Camp', href: '#news' }
          ]}
        ]
      },
      life: {
        kicker: 'Life on campus', title: 'A day here, end to end',
        blurb: 'Prayer and recitation in the morning, academic periods and a shared meal at midday, music and games before the walk home. The routines that let a child feel settled.',
        cta: 'See a day with us', href: '#life',
        groups: [
          { label: 'Daily care', items: [
            { label: 'Transport', href: '/contact' },
            { label: 'Meals', href: '#life' },
            { label: 'Health & Yoga', href: '#life' }
          ]},
          { label: 'Wellbeing & safety', items: [
            { label: 'Morning Assembly', href: '#life' },
            { label: 'Safety Guidelines', href: '/contact' }
          ]}
        ]
      },
      adm: {
        kicker: 'Admissions 2027–28', title: 'Come and see a morning',
        blurb: 'Applications for Nursery to Grade 10 are open. Visits are welcome on weekday mornings while classes are running.',
        cta: 'Start an enquiry', href: '/admissions#enquire',
        groups: [
          { label: 'How to apply', items: [
            { label: 'Eligibility & Documents', href: '/admissions' },
            { label: 'Schedule a Visit', href: '/admissions#enquire' },
            { label: 'Fee Structure', href: '/admissions#fees' }
          ]},
          { label: 'Policies', items: [
            { label: 'Refund Policy', href: '/admissions#fees' },
            { label: 'Family Login', href: '/login' }
          ]}
        ]
      },
      media: {
        kicker: 'Newsroom', title: 'News, events and answers',
        blurb: 'School announcements, festival days, photographs of the year as it happens, and straight answers to the questions families ask most.',
        cta: 'Read the latest', href: '#news',
        groups: [
          { label: 'News & stories', items: [
            { label: 'News & Events', href: '#news' },
            { label: 'Term Calendar', href: '#news' }
          ]},
          { label: 'Explore more', items: [
            { label: 'Photo Gallery', href: '#life' },
            { label: 'FAQ', href: '#faq' }
          ]}
        ]
      }
    };
  }

  dict(lang) {
    const T = {
      'Home': ['होम', 'ಮುಖಪುಟ'],
      'About Us': ['हमारे बारे में', 'ನಮ್ಮ ಬಗ್ಗೆ'],
      'Academics': ['शिक्षा', 'ಶಿಕ್ಷಣ'],
      'Gurukulam Life': ['गुरुकुलम् जीवन', 'ಗುರುಕುಲ ಜೀವನ'],
      'Admissions': ['प्रवेश', 'ಪ್ರವೇಶ'],
      'Media': ['मीडिया', 'ಮಾಧ್ಯಮ'],
      'Contact': ['संपर्क', 'ಸಂಪರ್ಕ'],
      'Enquire': ['पूछताछ', 'ವಿಚಾರಿಸಿ'],
      'Family Login': ['परिवार लॉगिन', 'ಕುಟುಂಬ ಲಾಗಿನ್'],
      'Admissions open': ['प्रवेश प्रारंभ', 'ಪ್ರವೇಶ ಪ್ರಾರಂಭ'],
      'Arundhati Gurukulam': ['अरुन्धती गुरुकुलम्', 'ಅರುಂಧತಿ ಗುರುಕುಲಂ'],
      'Rooted in character.': ['चरित्र में निहित।', 'ಚಾರಿತ್ರ್ಯದಲ್ಲಿ ಬೇರೂರಿದೆ.'],
      'Inspired by wisdom.': ['ज्ञान से प्रेरित।', 'ಜ್ಞಾನದಿಂದ ಪ್ರೇರಿತ.'],
      'Empowered for the future.': ['भविष्य के लिए सशक्त।', 'ಭವಿಷ್ಯಕ್ಕಾಗಿ ಸಶಕ್ತ.'],
      'Who we are': ['हम कौन हैं', 'ನಾವು ಯಾರು'],
      'Our values': ['हमारे मूल्य', 'ನಮ್ಮ ಮೌಲ್ಯಗಳು'],
      'Learning': ['अध्ययन', 'ಕಲಿಕೆ'],
      'Our process': ['हमारी प्रक्रिया', 'ನಮ್ಮ ಪ್ರಕ್ರಿಯೆ'],
      'Gurukulam life': ['गुरुकुलम् जीवन', 'ಗುರುಕುಲ ಜೀವನ'],
      'News & events': ['समाचार एवं आयोजन', 'ಸುದ್ದಿ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು'],
      'Why families choose us': ['परिवार हमें क्यों चुनते हैं', 'ಕುಟುಂಬಗಳು ನಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡುತ್ತವೆ'],
      'Parents ask': ['अभिभावक पूछते हैं', 'ಪೋಷಕರು ಕೇಳುತ್ತಾರೆ'],
      'Three words on the seal': ['मुद्रा पर तीन शब्द', 'ಮುದ್ರೆಯ ಮೇಲಿನ ಮೂರು ಪದಗಳು'],
      'Happening now': ['अभी हो रहा है', 'ಈಗ ನಡೆಯುತ್ತಿದೆ'],
      'Begin an enquiry': ['पूछताछ करें', 'ವಿಚಾರಣೆ ಆರಂಭಿಸಿ'],
      'Our story': ['हमारी कहानी', 'ನಮ್ಮ ಕಥೆ'],
      'Request a visit': ['भेंट का अनुरोध करें', 'ಭೇಟಿಗೆ ವಿನಂತಿಸಿ'],
      'Open calendar': ['कैलेंडर खोलें', 'ಕ್ಯಾಲೆಂಡರ್ ತೆರೆಯಿರಿ'],
      'Term dates and holidays': ['सत्र तिथियाँ एवं अवकाश', 'ಅವಧಿ ದಿನಾಂಕಗಳು ಮತ್ತು ರಜಾದಿನಗಳು'],
      'About us': ['हमारे बारे में', 'ನಮ್ಮ ಬಗ್ಗೆ'],
      'Reach us': ['हमसे संपर्क करें', 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ'],
      'Calendar': ['कैलेंडर', 'ಕ್ಯಾಲೆಂಡರ್'],
      'Terms': ['सत्र', 'ಅವಧಿಗಳು'],
      'Holidays': ['अवकाश', 'ರಜಾದಿನಗಳು'],
      "Announcements": ["घोषणाएँ", "ಪ್ರಕಟಣೆಗಳು"],
      "Notice board": ["सूचना पट्ट", "ಸೂಚನಾ ಫಲಕ"],
      "What families need to know this week": ["इस सप्ताह परिवारों के लिए आवश्यक सूचनाएँ", "ಈ ವಾರ ಕುಟುಂಬಗಳಿಗೆ ತಿಳಿಯಬೇಕಾದ ವಿಷಯಗಳು"],
      "Notices": ["सूचनाएँ", "ಸೂಚನೆಗಳು"],
      "Circulars": ["परिपत्र", "ಸುತ್ತೋಲೆಗಳು"],
      "Events &amp; results": ["आयोजन एवं परिणाम", "ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಫಲಿತಾಂಶ"],
      "Events & results": ["आयोजन एवं परिणाम", "ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಫಲಿತಾಂಶ"],
      "Read more": ["और पढ़ें", "ಇನ್ನಷ್ಟು ಓದಿ"],
      "Term calendar": ["सत्र कैलेंडर", "ಅವಧಿ ಕ್ಯಾಲೆಂಡರ್"],
      "Social media": ["सोशल मीडिया", "ಸಮಾಜ ಮಾಧ್ಯಮ"],
      "The school day, as it happens": ["विद्यालय का दिन, जैसा घटित होता है", "ಶಾಲೆಯ ದಿನ, ನಡೆಯುತ್ತಿರುವಂತೆ"],
      "From our page": ["हमारे पृष्ठ से", "ನಮ್ಮ ಪುಟದಿಂದ"],
      "Latest posts": ["नवीनतम पोस्ट", "ಇತ್ತೀಚಿನ ಪೋಸ್ಟ್‌ಗಳು"],
      "Follow on Facebook": ["फेसबुक पर जुड़ें", "ಫೇಸ್‌ಬುಕ್‌ನಲ್ಲಿ ಅನುಸರಿಸಿ"],
      "Subscribe on YouTube": ["यूट्यूब पर सब्सक्राइब करें", "ಯೂಟ್ಯೂಬ್‌ನಲ್ಲಿ ಚಂದಾದಾರರಾಗಿ"],
      "Students on roll": ["नामांकित विद्यार्थी", "ದಾಖಲಾದ ವಿದ್ಯಾರ್ಥಿಗಳು"],
      "Acharyas &amp; teachers": ["आचार्य एवं शिक्षक", "ಆಚಾರ್ಯರು ಮತ್ತು ಶಿಕ್ಷಕರು"],
      "Acharyas & teachers": ["आचार्य एवं शिक्षक", "ಆಚಾರ್ಯರು ಮತ್ತು ಶಿಕ್ಷಕರು"],
      "Children per class": ["प्रति कक्षा विद्यार्थी", "ಪ್ರತಿ ತರಗತಿಗೆ ಮಕ್ಕಳು"],
      "Student to teacher": ["विद्यार्थी–शिक्षक अनुपात", "ವಿದ್ಯಾರ್ಥಿ–ಶಿಕ್ಷಕ ಅನುಪಾತ"],
      "Languages from Grade 1": ["कक्षा 1 से भाषाएँ", "ತರಗತಿ 1 ರಿಂದ ಭಾಷೆಗಳು"],
      "Admissions 2027–28": ["प्रवेश 2027–28", "ಪ್ರವೇಶ 2027–28"],
      "Apply or visit": ["आवेदन करें या पधारें", "ಅರ್ಜಿ ಅಥವಾ ಭೇಟಿ"],
      "The curriculum": ["पाठ्यक्रम", "ಪಠ್ಯಕ್ರಮ"],
      "Sanskrit &amp; academics": ["संस्कृत एवं शैक्षणिक विषय", "ಸಂಸ್ಕೃತ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಿಷಯಗಳು"],
      "Sanskrit & academics": ["संस्कृत एवं शैक्षणिक विषय", "ಸಂಸ್ಕೃತ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಿಷಯಗಳು"],
      "Dates and holidays": ["तिथियाँ एवं अवकाश", "ದಿನಾಂಕಗಳು ಮತ್ತು ರಜೆಗಳು"],
      "Come and see": ["आकर देखें", "ಬಂದು ನೋಡಿ"],
      "Weekday mornings": ["कार्यदिवस प्रातःकाल", "ವಾರದ ದಿನಗಳ ಬೆಳಿಗ್ಗೆ"],
      "A day school in Basavanagudi where the Indian knowledge traditions and a modern academic curriculum are taught as one thing, not two.": ["बसवनगुडी का एक डे स्कूल, जहाँ भारतीय ज्ञान परंपरा और आधुनिक शैक्षणिक पाठ्यक्रम दो नहीं, एक ही रूप में पढ़ाए जाते हैं।", "ಬಸವನಗುಡಿಯ ಡೇ ಸ್ಕೂಲ್ — ಇಲ್ಲಿ ಭಾರತೀಯ ಜ್ಞಾನ ಪರಂಪರೆ ಮತ್ತು ಆಧುನಿಕ ಶೈಕ್ಷಣಿಕ ಪಠ್ಯಕ್ರಮವನ್ನು ಎರಡಾಗಿ ಅಲ್ಲ, ಒಂದೇ ಆಗಿ ಕಲಿಸಲಾಗುತ್ತದೆ."],
      "A gurukulam, kept in the middle of the city": ["नगर के मध्य में बसा एक गुरुकुलम्", "ನಗರದ ನಡುವೆ ಉಳಿದ ಗುರುಕುಲ"],
      "One timetable, two inheritances": ["एक समय-सारिणी, दो परंपराएँ", "ಒಂದು ವೇಳಾಪಟ್ಟಿ, ಎರಡು ಪರಂಪರೆ"],
      "A day here, end to end": ["यहाँ का एक पूरा दिन", "ಇಲ್ಲಿನ ಒಂದು ಪೂರ್ಣ ದಿನ"],
      "Four stages, Nursery to Grade 10": ["चार चरण, नर्सरी से कक्षा 10", "ನಾಲ್ಕು ಹಂತಗಳು, ನರ್ಸರಿಯಿಂದ ತರಗತಿ 10"],
      "Morning": ["प्रातः", "ಬೆಳಿಗ್ಗೆ"],
      "Midday": ["मध्याह्न", "ಮಧ್ಯಾಹ್ನ"],
      "Evening": ["सायं", "ಸಂಜೆ"],
      "See the curriculum": ["पाठ्यक्रम देखें", "ಪಠ್ಯಕ್ರಮ ನೋಡಿ"],
      "Nursery – Grade 10": ["नर्सरी – कक्षा 10", "ನರ್ಸರಿ – ತರಗತಿ 10"],
      "Nursery to Grade 10": ["नर्सरी से कक्षा 10", "ನರ್ಸರಿಯಿಂದ ತರಗತಿ 10"],
      "Grades offered": ["उपलब्ध कक्षाएँ", "ಲಭ್ಯ ತರಗತಿಗಳು"],
      "Published on": ["प्रकाशित", "ಪ್ರಕಟಿಸಲಾಗಿದೆ"],
      "All news": ["सभी समाचार", "ಎಲ್ಲಾ ಸುದ್ದಿ"],
      "Open the gallery": ["चित्र-दीर्घा खोलें", "ಚಿತ್ರಸಂಗ್ರಹ ತೆರೆಯಿರಿ"],
      "Vision, mission and values": ["दृष्टि, ध्येय एवं मूल्य", "ದೃಷ್ಟಿ, ಧ್ಯೇಯ ಮತ್ತು ಮೌಲ್ಯಗಳು"],
      "Protected": ["सुरक्षित", "ಸಂರಕ್ಷಿತ"],
      "Well taught": ["सुशिक्षित", "ಸುಶಿಕ್ಷಿತ"],
      "Of good character": ["सुशील", "ಸುಶೀಲ"],
      'Skip to main content': ['मुख्य सामग्री पर जाएँ', 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ'],
      'Skip to Navigation': ['नेविगेशन पर जाएँ', 'ಸಂಚರಣೆಗೆ ಹೋಗಿ'],
      'Text Size:': ['पाठ आकार:', 'ಪಠ್ಯ ಗಾತ್ರ:'],
      'Screen Reader': ['स्क्रीन रीडर', 'ಸ್ಕ್ರೀನ್ ರೀಡರ್'],
      'Stop Reading': ['पढ़ना रोकें', 'ಓದುವುದನ್ನು ನಿಲ್ಲಿಸಿ']
    };
    const i = lang === 'hi' ? 0 : 1;
    const out = {};
    for (const k in T) out[k] = T[k][i];
    return out;
  }

  applyLang() {
    const lang = (this.state && this.state.lang) || 'en';
    if (typeof document === 'undefined') return;
    if (window.AG_I18N) { window.AG_I18N.apply(lang); return; }
    const root = document.documentElement;
    if (lang === 'en') {
      root.style.removeProperty('--font-body');
      root.style.removeProperty('--font-heading');
      if (this.swapped) {
        for (const [node, txt] of this.swapped) node.nodeValue = txt;
        this.swapped = null;
      }
      return;
    }
    const fb = lang === 'hi'
      ? "'Noto Sans Devanagari','Figtree',sans-serif"
      : "'Noto Sans Kannada','Figtree',sans-serif";
    const fh = lang === 'hi'
      ? "'Noto Serif Devanagari','Caprasimo',serif"
      : "'Noto Serif Kannada','Caprasimo',serif";
    root.style.setProperty('--font-body', fb);
    root.style.setProperty('--font-heading', fh);

    const d = this.dict(lang);
    if (this.swapped) { for (const [n, t] of this.swapped) n.nodeValue = t; }
    const pairs = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      const raw = n.nodeValue;
      const key = raw.trim();
      if (!key || !d[key]) continue;
      pairs.push([n, raw]);
      n.nodeValue = raw.replace(key, d[key]);
    }
    this.swapped = pairs;
  }

  componentDidUpdate(prevProps, prevState) {
    const ps = prevState || {};
    const st = this.state || {};
    const countsOnly = ps.counts !== st.counts && ps.lang === st.lang && ps.zoom === st.zoom;
    if (ps.lang !== st.lang) { this.applyLang(); }
    else if (!countsOnly && st.lang && st.lang !== 'en') this.applyLang();
    if (ps.zoom !== st.zoom) {
      document.documentElement.style.zoom = (st.zoom || 1) * 0.9;
    }
  }

  speak() {
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      const main = document.querySelector('[data-main="1"]');
      const scope = main ? main.parentElement : document.body;
      const text = (scope.innerText || '').replace(/\s+/g, ' ').slice(0, 4000);
      const u = new SpeechSynthesisUtterance(text);
      const lang = this.state.lang || 'en';
      u.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-IN';
      u.rate = 0.95;
      u.onend = () => this.setState({ reader: false });
      synth.speak(u);
    } catch (e) {}
  }

  renderVals() {
    const s = this.state.slide;
    const lang = this.state.lang || 'en';
    const pill = 'color-mix(in srgb, var(--color-accent-2-200) 18%, transparent)';
    const m = this.state.menu;
    const hot = 'var(--color-accent-700)';
    const mega = this.menus()[m] || null;
    const on = 'var(--color-accent-2-500)';
    const off = 'color-mix(in srgb, var(--color-bg) 42%, transparent)';
    const ct = this.state.counts || [0, 0, 0, 0, 0];
    return {
      c0: ct[0] + '+',
      c1: ct[1],
      c2: ct[2],
      c3: ct[3] + ':1',
      c4: ct[4],
      railDisplay: this.state.w < 1180 ? 'none' : 'flex',
      ticker: (this.state.site && this.state.site.ticker) || [
        { text: 'Admissions for 2027–28 are open — Nursery to Grade 10' },
        { text: 'Ganesha Chaturthi holiday: school closed 5 September' },
        { text: 'Parent–teacher meeting for Grades 6–8 on 20 September' },
        { text: 'Sanskrit recitation evening at Raghavasadanam, 27 September' },
        { text: 'Half-yearly examinations begin 17 November' }
      ],
      boards: (this.state.site && this.state.site.boards && this.state.site.boards.some(b => b.items.length)) ? this.state.site.boards : [
        { label: 'Notices', count: '4 new', items: [
          { date: 'Published 14 Sep 2026', text: 'Admission enquiries for Nursery to Grade 10, academic year 2027–28, are now being taken at the office.' },
          { date: 'Published 11 Sep 2026', text: 'Revised school timings for the monsoon weeks: assembly begins at 8:45 am until 30 September.' },
          { date: 'Published 8 Sep 2026', text: 'Uniform and book distribution for new families, Saturday 19 September, 9 am to 12 noon.' },
          { date: 'Published 2 Sep 2026', text: 'Transport route changes for Jayanagar and Padmanabhanagar effective 8 September.' }
        ]},
        { label: 'Circulars', count: '3 new', items: [
          { date: 'Published 12 Sep 2026', text: 'Circular 14/2026: Term II fee schedule and the last date for payment without late charge.' },
          { date: 'Published 9 Sep 2026', text: 'Circular 13/2026: Attendance requirement for Grades 9 and 10 ahead of the board examinations.' },
          { date: 'Published 3 Sep 2026', text: 'Circular 12/2026: Guidelines for the Sanskrit recitation evening and parent participation.' },
          { date: 'Published 28 Aug 2026', text: 'Circular 11/2026: Medical records and consent forms to be updated for every child.' }
        ]},
        { label: 'Events & results', count: '2 new', items: [
          { date: '27 September 2026', text: 'Sanskrit recitation evening — Grades 4 to 10 recite at Raghavasadanam, 5:30 pm.' },
          { date: '20 September 2026', text: 'Parent–teacher meeting, Grades 6 to 8, in the main hall from 9 am.' },
          { date: '15 September 2026', text: 'Results of the Term I assessment published to parent logins.' },
          { date: '5 September 2026', text: 'Ganesha Chaturthi — school closed. Puja at the math for families who wish to attend.' }
        ]}
      ],
      slide0: s === 0 ? 1 : 0,
      slide1: s === 1 ? 1 : 0,
      slide2: s === 2 ? 1 : 0,
      dot0: s === 0 ? on : off,
      dot1: s === 1 ? on : off,
      dot2: s === 2 ? on : off,
      go0: () => this.go(0),
      go1: () => this.go(1),
      go2: () => this.go(2),
      closeMenu: () => this.setState({ menu: null }),
      openAbout: () => this.setState({ menu: 'about' }),
      openAcademics: () => this.setState({ menu: 'academics' }),
      openLife: () => this.setState({ menu: 'life' }),
      openAdm: () => this.setState({ menu: 'adm' }),
      openMedia: () => this.setState({ menu: 'media' }),
      aboutColor: m === 'about' ? hot : 'inherit',
      academicsColor: m === 'academics' ? hot : 'inherit',
      lifeColor: m === 'life' ? hot : 'inherit',
      admColor: m === 'adm' ? hot : 'inherit',
      mediaColor: m === 'media' ? hot : 'inherit',
      aboutBg: m === 'about' ? 'var(--color-accent-800)' : 'transparent',
      academicsBg: m === 'academics' ? 'var(--color-accent-800)' : 'transparent',
      lifeBg: m === 'life' ? 'var(--color-accent-800)' : 'transparent',
      admBg: m === 'adm' ? 'var(--color-accent-800)' : 'transparent',
      mediaBg: m === 'media' ? 'var(--color-accent-800)' : 'transparent',
      megaOpen: !!mega,
      megaKicker: mega ? mega.kicker : '',
      megaTitle: mega ? mega.title : '',
      megaBlurb: mega ? mega.blurb : '',
      megaCta: mega ? mega.cta : '',
      megaHref: mega ? mega.href : '#top',
      megaGroups: mega ? mega.groups : [],
      welcomeMounted: this.state.welcome !== 'gone',
      welcomeOpacity: this.state.welcome === 'in' ? 1 : 0,
      welcomePointer: this.state.welcome === 'in' ? 'auto' : 'none',
      nameOpacity: this.state.nameIn ? 1 : 0,
      nameShift: this.state.nameIn ? '0px' : '18px',
      dismiss: () => this.dismiss && this.dismiss(),
      noSubmit: (e) => e.preventDefault(),
      visitSubmit: (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fields = collectForm(form);
        if (!Object.values(fields).some((x) => x.trim())) { toast('Please add your name and phone number.', true); return; }
        sendEnquiry('visit', fields)
          .then((r) => { form.reset(); toast('Thank you — the office will call you. Reference ' + r.reference + '.'); })
          .catch((err) => toast(err.message, true));
      },
      compact: this.state.w < 1180,
      navDisplay: this.state.w < 1180 ? 'none' : 'flex',
      bandDisplay: this.state.w < 1180 ? 'none' : 'block',
      mobileOpen: this.state.w < 1180 && this.state.mobileOpen,
      toggleMobile: () => this.setState(st => ({ mobileOpen: !st.mobileOpen })),
      closeMobile: () => this.setState({ mobileOpen: false }),
      skipMain: () => { this.dismiss && this.dismiss(); const t = document.querySelector('[data-main="1"]'); if (t) window.scrollTo({ top: t.offsetTop - 60, behavior: 'smooth' }); },
      skipNav: () => { this.dismiss && this.dismiss(); const t = document.getElementById('mainnav'); if (t) window.scrollTo({ top: t.offsetTop, behavior: 'smooth' }); },
      readerOn: !!this.state.reader,
      readerBg: this.state.reader ? pill : 'transparent',
      readerLabel: this.state.reader ? 'Stop Reading' : 'Screen Reader',
      toggleReader: () => {
        if (this.state.reader) { try { window.speechSynthesis.cancel(); } catch (e) {} this.setState({ reader: false }); }
        else { this.setState({ reader: true }); setTimeout(() => this.speak(), 60); }
      },
      textSmaller: () => this.setState(st => ({ zoom: Math.max(0.85, Math.round(((st.zoom || 1) - 0.1) * 100) / 100) })),
      textReset: () => this.setState({ zoom: 1 }),
      textLarger: () => this.setState(st => ({ zoom: Math.min(1.4, Math.round(((st.zoom || 1) + 0.1) * 100) / 100) })),
      langValue: this.state.lang || 'en',
      pickLang: (e) => { const v = e.target.value; if (window.AG_I18N) window.AG_I18N.set(v); this.setState({ lang: v }); },
      setEn: () => this.setState({ lang: 'en' }),
      setHi: () => this.setState({ lang: 'hi' }),
      setKn: () => this.setState({ lang: 'kn' }),
      enBg: lang === 'en' ? pill : 'transparent',
      hiBg: lang === 'hi' ? pill : 'transparent',
      knBg: lang === 'kn' ? pill : 'transparent',
      enFg: lang === 'en' ? 'var(--color-accent-2-400)' : 'inherit',
      hiFg: lang === 'hi' ? 'var(--color-accent-2-400)' : 'inherit',
      knFg: lang === 'kn' ? 'var(--color-accent-2-400)' : 'inherit',
      noticeOpen: !!this.state.notice,
      calOpen: !!this.state.cal,
      openCal: () => this.setState({ cal: true, calTab: this.state.calTab || 'terms' }),
      closeCal: () => this.setState({ cal: false }),
      calTerms: () => this.setState({ calTab: 'terms' }),
      calHolidays: () => this.setState({ calTab: 'holidays' }),
      showTerms: (this.state.calTab || 'terms') === 'terms',
      showHolidays: this.state.calTab === 'holidays',
      termsBg: (this.state.calTab || 'terms') === 'terms' ? 'var(--color-accent-900)' : 'transparent',
      termsFg: (this.state.calTab || 'terms') === 'terms' ? 'var(--color-accent-2-100)' : 'var(--color-text)',
      termsBorder: (this.state.calTab || 'terms') === 'terms' ? 'var(--color-accent-900)' : 'var(--color-divider)',
      holsBg: this.state.calTab === 'holidays' ? 'var(--color-accent-900)' : 'transparent',
      holsFg: this.state.calTab === 'holidays' ? 'var(--color-accent-2-100)' : 'var(--color-text)',
      holsBorder: this.state.calTab === 'holidays' ? 'var(--color-accent-900)' : 'var(--color-divider)',
      terms: (this.state.site && this.state.site.terms) || [
        { name: 'Term I', weeks: '14 weeks', dates: '2 June – 12 September', note: 'Vidyarambham on 2 June. Mid-term break 11–15 August.' },
        { name: 'Term II', weeks: '13 weeks', dates: '29 September – 24 December', note: 'Half-yearly examinations 17–24 November.' },
        { name: 'Term III', weeks: '13 weeks', dates: '5 January – 10 April', note: 'Annual examinations 23 March – 4 April.' }
      ],
      holidays: (this.state.site && this.state.site.holidays) || [
        { when: '2 Jun', what: 'Vidyarambham — school reopens' },
        { when: '11–15 Aug', what: 'Mid-term break' },
        { when: '15 Aug', what: 'Independence Day' },
        { when: '5 Sep', what: 'Ganesha Chaturthi' },
        { when: '13–27 Sep', what: 'Dasara holidays' },
        { when: '8 Nov', what: 'Deepavali' },
        { when: '25 Dec–4 Jan', what: 'Winter break' },
        { when: '14 Jan', what: 'Makara Sankranti' },
        { when: '26 Jan', what: 'Republic Day' },
        { when: '17 Feb', what: 'Maha Shivaratri' },
        { when: '30 Mar', what: 'Ugadi' },
        { when: '11 Apr', what: 'Summer break begins' }
      ],
      stop: (e) => e.stopPropagation(),
      closeNotice: () => this.setState({ notice: false }),
      faqs: ((this.state.site && this.state.site.faqs) ? this.state.site.faqs.map(f => [f.q, f.a]) : [
        ['Which grades does Arundhati Gurukulam admit?', 'Nursery to Grade 10. It is a day school — children come each morning from across Bengaluru and go home each evening.'],
        ['Is this a traditional gurukulam or a regular school?', 'Both, and deliberately so. Sanskrit, Veda and the shastras are taught alongside mathematics, the sciences and languages — by the same teachers, in the same timetable, to the same standard.'],
        ['Does my child need to know Sanskrit before joining?', 'No. Sanskrit is taught from the beginning, by ear before by grammar. Children who join in later grades are given additional support to catch up.'],
        ['Where is the school, and what are the timings?', 'No.2, Raghavasadanam, Pampa Mahakavi Road, in the Uttaradi Math compound at Shankarapuram, Basavanagudi. Call the office for the current day timings.'],
        ['How do I apply, and can I visit first?', 'Leave your details in the enquiry form on this page and the office will call you. Visits are welcome on weekday mornings while classes are running — most families come and see a morning before applying.']
      ]).map((f, i) => ({
        q: f[0], a: f[1],
        open: this.state.faq === i,
        sign: this.state.faq === i ? '–' : '+',
        toggle: () => this.setState(st => ({ faq: st.faq === i ? null : i }))
      })),
      dontShowNotice: () => {
        this.noticeMuted = true;
        this.setState({ notice: false });
      }
    };
  }
}

export default HomePageLogic;
