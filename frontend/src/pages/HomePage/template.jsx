// Generated from "Arundhati Home.dc.html" — markup kept 1:1 with the original design.
import React from 'react';
import { I, S, L, D, css, pc, cx } from '../../dc/runtime.js';

export default function template(v) {
  return (
    <>
    <div style={{"background":"var(--color-bg)","color":"var(--color-text)","fontFamily":"var(--font-body)"}}>
      {" "}
      {(v.welcomeMounted) ? (<>
        {" "}
        <div style={css(`position:fixed;inset:0;z-index:400;background:var(--color-marigold-soft);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(14px,2.4vh,34px);padding:32px 0 104px;box-sizing:border-box;isolation:isolate;opacity:${S(v.welcomeOpacity)};pointer-events:${S(v.welcomePointer)};transition:opacity .85s cubic-bezier(.4,0,.2,1)`)} onClick={v.dismiss}>
          {" "}
          <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"max(120vh,110vw)","opacity":".085","animation":"agni-spin 320s linear infinite","pointerEvents":"none"}} />
          {" "}
          <img src="/assets/img-02-9e5641.png" alt="Saraswati, seated with the veena" style={{"position":"relative","zIndex":"1","height":"min(58vh,660px)","width":"auto","maxWidth":"90vw","objectFit":"contain","animation":"agni-descend 1.7s cubic-bezier(.16,.84,.24,1) both"}} />
          {" "}
          <div style={css(`position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:0 24px;opacity:${S(v.nameOpacity)};transform:translateY(${S(v.nameShift)});transition:opacity 1.1s ease,transform 1.1s cubic-bezier(.2,.8,.2,1)`)}>
            {" "}
            <span style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(34px,6.2vw,72px)","lineHeight":"1.02","letterSpacing":"-.015em","color":"var(--color-accent-900)"}}>
              {"Arundhati Gurukulam"}
            </span>
            {" "}
            <span style={{"fontFamily":"var(--font-devanagari)","fontSize":"clamp(16px,2.2vw,25px)","color":"var(--color-accent-800)"}}>
              {"सुरक्षिता · सुशिक्षिता · सुशीला"}
            </span>
            {" "}
          </div>
          {" "}
          <span style={css(`position:absolute;left:50%;bottom:26px;transform:translateX(-50%);z-index:1;display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--color-accent-900);opacity:${S(v.nameOpacity)};transition:opacity 1.1s ease`)}>
            {" "}
            <span style={{"fontSize":"10.5px","letterSpacing":".24em","textTransform":"uppercase"}}>
              {"Scroll"}
            </span>
            {" "}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" style={{"animation":"agni-bob 2.6s ease-in-out infinite"}}>
              <path d="M6 9l6 6 6-6"></path>
            </svg>
            {" "}
          </span>
          {" "}
        </div>
        {" "}
      </>) : null}
      {" "}
      {(v.calOpen) ? (<>
        {" "}
        <div style={{"position":"fixed","inset":"0","zIndex":"820","background":"color-mix(in srgb,#251611 58%,transparent)","display":"flex","alignItems":"center","justifyContent":"center","padding":"20px"}} onClick={v.closeCal}>
          {" "}
          <div style={{"position":"relative","width":"min(680px,100%)","maxHeight":"calc(100vh - 40px)","overflow":"hidden","display":"flex","flexDirection":"column","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","boxShadow":"var(--shadow-lg)"}} onClick={v.stop}>
            {" "}
            <div style={{"position":"relative","flex":"none","overflow":"hidden","background":"var(--color-accent-900)","color":"var(--color-accent-2-200)","padding":"clamp(22px,3vw,30px) clamp(22px,3.4vw,34px)"}}>
              {" "}
              <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","right":"-14%","top":"-90%","width":"min(340px,60%)","opacity":".14","pointerEvents":"none"}} />
              {" "}
              <button aria-label="Close" onClick={v.closeCal} style={{"position":"absolute","top":"14px","right":"14px","width":"40px","height":"40px","borderRadius":"999px","border":"0","background":"none","color":"var(--color-accent-2-300)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}} className={cx(pc("hover", "background:color-mix(in srgb,var(--color-accent-2-200) 16%,transparent);color:var(--color-accent-2-100)"))}>
                {" "}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
                {" "}
              </button>
              {" "}
              <div style={{"position":"relative","display":"flex","flexDirection":"column","gap":"6px","paddingRight":"44px"}}>
                {" "}
                <span style={{"fontSize":"11px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
                  {"Academic year 2027–28"}
                </span>
                {" "}
                <h3 style={{"margin":"0","fontFamily":"var(--font-heading)","fontSize":"clamp(22px,2.4vw,29px)","lineHeight":"1.06"}}>
                  {"Term dates and holidays"}
                </h3>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{"padding":"clamp(22px,3.4vw,32px)","display":"flex","flexDirection":"column","gap":"clamp(22px,3vw,30px)","minHeight":"0","overflowY":"auto","scrollbarWidth":"thin","scrollbarColor":"color-mix(in srgb,var(--color-accent-900) 28%,transparent) transparent"}}>
              {" "}
              <div style={{"display":"flex","gap":"8px","flexWrap":"wrap"}}>
                {" "}
                <button onClick={v.calTerms} style={css(`border-radius:999px;white-space:nowrap;padding:9px 18px;font-size:13.5px;cursor:pointer;border:1px solid ${S(v.termsBorder)};background:${S(v.termsBg)};color:${S(v.termsFg)}`)} className={cx("btn", pc("hover", "border-color:var(--color-accent-700)"))}>
                  {"Terms"}
                </button>
                {" "}
                <button onClick={v.calHolidays} style={css(`border-radius:999px;white-space:nowrap;padding:9px 18px;font-size:13.5px;cursor:pointer;border:1px solid ${S(v.holsBorder)};background:${S(v.holsBg)};color:${S(v.holsFg)}`)} className={cx("btn", pc("hover", "border-color:var(--color-accent-700)"))}>
                  {"Holidays"}
                </button>
                {" "}
              </div>
              {" "}
              {(v.showTerms) ? (<>
                {" "}
                <div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>
                  {" "}
                  {L(v.terms).map((t, $i0) => { const $index = $i0; return (<React.Fragment key={$i0}>
                    {" "}
                    <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(190px,100%),1fr))","gap":"10px 20px","alignItems":"baseline","paddingBottom":"14px","borderBottom":"1px solid var(--color-divider)"}}>
                      {" "}
                      <div style={{"display":"flex","flexDirection":"column","gap":"3px","minWidth":"0"}}>
                        {" "}
                        <span style={{"fontFamily":"var(--font-heading)","fontSize":"19px"}}>
                          {I(t?.name)}
                        </span>
                        {" "}
                        <span style={{"fontSize":"12.5px","letterSpacing":".1em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                          {I(t?.weeks)}
                        </span>
                        {" "}
                      </div>
                      {" "}
                      <div style={{"display":"flex","flexDirection":"column","gap":"3px","minWidth":"0"}}>
                        {" "}
                        <span style={{"fontSize":"15.5px","fontWeight":"600"}}>
                          {I(t?.dates)}
                        </span>
                        {" "}
                        <span style={{"fontSize":"14px","color":"var(--color-neutral-700)"}}>
                          {I(t?.note)}
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </React.Fragment>); })}
                  {" "}
                </div>
                {" "}
              </>) : null}
              {" "}
              {(v.showHolidays) ? (<>
                {" "}
                <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(240px,100%),1fr))","gap":"10px 22px"}}>
                  {" "}
                  {L(v.holidays).map((d, $i1) => { const $index = $i1; return (<React.Fragment key={$i1}>
                    {" "}
                    <div style={{"display":"flex","gap":"12px","alignItems":"baseline","padding":"9px 0","borderBottom":"1px solid var(--color-divider)","minWidth":"0"}}>
                      {" "}
                      <span style={{"flex":"0 0 104px","fontSize":"13px","letterSpacing":".06em","color":"var(--color-accent-700)","fontWeight":"600"}}>
                        {I(d?.when)}
                      </span>
                      {" "}
                      <span style={{"fontSize":"15px","minWidth":"0"}}>
                        {I(d?.what)}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </React.Fragment>); })}
                  {" "}
                </div>
                {" "}
              </>) : null}
              {" "}
              <div style={{"background":"var(--color-accent-2-200)","borderRadius":"var(--radius-md)","padding":"16px 18px","display":"flex","flexDirection":"column","gap":"6px"}}>
                {" "}
                <span style={{"fontSize":"11px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-800)"}}>
                  {"Please note"}
                </span>
                {" "}
                <span style={{"fontSize":"14.5px","lineHeight":"1.55","color":"var(--color-accent-900)"}}>
                  {"These dates are placeholders for the design. Send me the school's real calendar and I will set it exactly."}
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </>) : null}
      {" "}
      {(v.noticeOpen) ? (<>
        {" "}
        <div style={{"position":"fixed","inset":"0","zIndex":"800","background":"color-mix(in srgb,#251611 55%,transparent)","display":"flex","alignItems":"center","justifyContent":"center","padding":"24px"}} onClick={v.closeNotice}>
          {" "}
          <div style={{"position":"relative","width":"min(468px,100%)","maxHeight":"calc(100vh - 48px)","overflow":"hidden","display":"flex","flexDirection":"column","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","boxShadow":"var(--shadow-lg)"}} onClick={v.stop}>
            {" "}
            <button aria-label="Close" onClick={v.closeNotice} style={{"position":"absolute","zIndex":"2","top":"14px","right":"14px","width":"40px","height":"40px","borderRadius":"999px","border":"0","background":"none","color":"var(--color-neutral-700)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}} className={cx(pc("hover", "background:color-mix(in srgb,var(--color-text) 8%,transparent);color:var(--color-text)"))}>
              {" "}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
              {" "}
            </button>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"clamp(12px,2.4vh,20px)","minHeight":"0","overflowY":"auto","padding":"clamp(18px,4vh,34px) clamp(22px,3.4vw,34px)","scrollbarWidth":"thin","scrollbarColor":"color-mix(in srgb,var(--color-accent-900) 28%,transparent) transparent"}}>
              {" "}
              <div style={{"display":"flex","flexDirection":"column","gap":"8px","paddingRight":"40px"}}>
                {" "}
                <span style={{"fontSize":"11px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                  {"Admissions notice"}
                </span>
                {" "}
                <h2 style={{"margin":"0","fontSize":"clamp(22px,2.3vw,28px)","lineHeight":"1.06","letterSpacing":"-.01em"}}>
                  {"Rooted in character. Inspired by wisdom."}
                </h2>
                {" "}
              </div>
              {" "}
              <div style={{"position":"relative","overflow":"hidden","border":"2px solid var(--color-accent-800)","borderRadius":"var(--radius-md)","background":"var(--color-marigold-soft)","padding":"clamp(14px,3vh,29px) clamp(21px,2.8vw,29px)","display":"flex","flexDirection":"column","alignItems":"center","gap":"clamp(8px,1.8vh,14px)","textAlign":"center"}}>
                {" "}
                <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"180%","opacity":".08","animation":"agni-spin 320s linear infinite","pointerEvents":"none"}} />
                {" "}
                <img src="/assets/img-03-55c76a.png" alt="Arundhati Gurukulam" style={{"position":"relative","height":"clamp(48px,10vh,74px)","width":"auto"}} />
                {" "}
                <span style={{"position":"relative","fontFamily":"var(--font-heading)","fontSize":"clamp(24px,2.8vw,33px)","lineHeight":"1","color":"var(--color-accent-900)"}}>
                  {"Admissions open"}
                </span>
                {" "}
                <span style={{"position":"relative","fontSize":"15px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-accent-900)"}}>
                  {"For AY 2027–28"}
                </span>
                {" "}
                <span style={{"position":"relative","height":"1px","width":"64px","background":"color-mix(in srgb,var(--color-accent-900) 35%,transparent)"}}></span>
                {" "}
                <span style={{"position":"relative","fontSize":"15.5px","lineHeight":"1.55","color":"var(--color-accent-900)","maxWidth":"34ch"}}>
                  {"Nursery to Grade 10. Visits are welcome on weekday mornings while classes are running."}
                </span>
                {" "}
                <a href="#admissions" onClick={v.closeNotice} style={{"position":"relative","borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 28px","fontSize":"15px","background":"var(--color-accent-900)","color":"var(--color-accent-2-100)","marginTop":"4px"}} className={cx("btn")}>
                  {"Click here to apply"}
                </a>
                {" "}
              </div>
              {" "}
              <button onClick={v.dontShowNotice} style={{"alignSelf":"flex-start","background":"none","border":"0","padding":"0","font":"inherit","fontSize":"13.5px","color":"var(--color-neutral-700)","textDecoration":"underline","cursor":"pointer"}}>
                {"Don't show again"}
              </button>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </>) : null}
      {" "}
      <header style={{"position":"relative","zIndex":"50","background":"var(--color-bg)"}}>
        {" "}
        <div style={{"background":"#1E120D","color":"var(--color-accent-2-200)"}}>
          {" "}
          <div style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"6px clamp(18px,3.4vw,52px)","display":"flex","gap":"6px 14px","alignItems":"center","flexWrap":"wrap","fontSize":"12.5px"}}>
            {" "}
            <button onClick={v.skipMain} style={{"background":"none","border":"0","font":"inherit","color":"inherit","cursor":"pointer","padding":"5px 6px","display":"flex","gap":"6px","alignItems":"center"}} className={cx(pc("hover", "color:var(--color-accent-2-400)"))}>
              {" "}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
              {"\n          Skip to main content\n        "}
            </button>
            {" "}
            <span style={{"opacity":".28"}}>
              {"|"}
            </span>
            {" "}
            <button onClick={v.skipNav} style={{"background":"none","border":"0","font":"inherit","color":"inherit","cursor":"pointer","padding":"5px 6px","display":"flex","gap":"6px","alignItems":"center"}} className={cx(pc("hover", "color:var(--color-accent-2-400)"))}>
              {" "}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
              {"\n          Skip to Navigation\n        "}
            </button>
            {" "}
            <span style={{"opacity":".28"}}>
              {"|"}
            </span>
            {" "}
            <button onClick={v.toggleReader} aria-pressed={v.readerOn} style={css(`background:${S(v.readerBg)};border:0;border-radius:999px;font:inherit;color:inherit;cursor:pointer;padding:5px 10px;display:flex;gap:6px;align-items:center`)} className={cx(pc("hover", "color:var(--color-accent-2-400)"))}>
              {" "}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5 6 9H2v6h4l5 4V5z"></path>
                <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
                <path d="M19 5a9 9 0 0 1 0 14"></path>
              </svg>
              {"\n          "}{I(v.readerLabel)}{"\n        "}
            </button>
            {" "}
            <span style={{"opacity":".28"}}>
              {"|"}
            </span>
            {" "}
            <span style={{"display":"flex","gap":"7px","alignItems":"center"}}>
              {" "}
              <span style={{"opacity":".75"}}>
                {"Text Size:"}
              </span>
              {" "}
              <button onClick={v.textSmaller} aria-label="Decrease text size" style={{"background":"none","border":"1px solid color-mix(in srgb,var(--color-accent-2-200) 26%,transparent)","borderRadius":"6px","font":"inherit","fontSize":"12px","color":"inherit","cursor":"pointer","width":"24px","height":"24px","display":"flex","alignItems":"center","justifyContent":"center"}} className={cx(pc("hover", "border-color:var(--color-accent-2-400);color:var(--color-accent-2-400)"))}>
                {"A−"}
              </button>
              {" "}
              <button onClick={v.textReset} aria-label="Normal text size" style={{"background":"none","border":"1px solid color-mix(in srgb,var(--color-accent-2-200) 26%,transparent)","borderRadius":"6px","font":"inherit","fontSize":"13px","color":"inherit","cursor":"pointer","width":"24px","height":"24px","display":"flex","alignItems":"center","justifyContent":"center"}} className={cx(pc("hover", "border-color:var(--color-accent-2-400);color:var(--color-accent-2-400)"))}>
                {"A"}
              </button>
              {" "}
              <button onClick={v.textLarger} aria-label="Increase text size" style={{"background":"none","border":"1px solid color-mix(in srgb,var(--color-accent-2-200) 26%,transparent)","borderRadius":"6px","font":"inherit","fontSize":"14px","color":"inherit","cursor":"pointer","width":"24px","height":"24px","display":"flex","alignItems":"center","justifyContent":"center"}} className={cx(pc("hover", "border-color:var(--color-accent-2-400);color:var(--color-accent-2-400)"))}>
                {"A+"}
              </button>
              {" "}
            </span>
            {" "}
            <span style={{"opacity":".28"}}>
              {"|"}
            </span>
            {" "}
            <span style={{"display":"flex","gap":"7px","alignItems":"center"}}>
              {" "}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" style={{"opacity":".75"}}>
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M3.2 9h17.6"></path>
                <path d="M3.2 15h17.6"></path>
                <path d="M12 3a15 15 0 0 1 0 18"></path>
                <path d="M12 3a15 15 0 0 0 0 18"></path>
              </svg>
              {" "}
              <select aria-label="Choose a language" onChange={v.pickLang} value={D(v.langValue, "")} style={{"background":"var(--color-accent-900)","border":"1px solid color-mix(in srgb,var(--color-accent-2-200) 30%,transparent)","borderRadius":"999px","font":"inherit","fontSize":"12.5px","fontWeight":"600","color":"var(--color-accent-2-200)","cursor":"pointer","padding":"5px 10px"}}>
                {" "}
                <option value="en">
                  {"English"}
                </option>
                {" "}
                <option value="hi">
                  {"हिंदी"}
                </option>
                {" "}
                <option value="kn">
                  {"ಕನ್ನಡ"}
                </option>
                {" "}
                <option value="ta">
                  {"தமிழ்"}
                </option>
                {" "}
                <option value="te">
                  {"తెలుగు"}
                </option>
                {" "}
                <option value="ml">
                  {"മലയാളം"}
                </option>
                {" "}
                <option value="mr">
                  {"मराठी"}
                </option>
                {" "}
                <option value="sa">
                  {"संस्कृतम्"}
                </option>
                {" "}
              </select>
              {" "}
            </span>
            {" "}
            <span style={{"marginLeft":"auto","display":"flex","gap":"14px","alignItems":"center","flexWrap":"wrap"}}>
              {" "}
              <a href="tel:+919686052212" style={{"color":"inherit","textDecoration":"none","display":"flex","gap":"6px","alignItems":"center"}} className={cx(pc("hover", "color:var(--color-accent-2-400)"))}>
                {" "}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {"\n            +91 96860 52212\n          "}
              </a>
              {" "}
              <a href="/login" style={{"color":"var(--color-accent-2-400)","textDecoration":"none","fontWeight":"600"}} className={cx(pc("hover", "color:var(--color-accent-2-200)"))}>
                {"Family Login"}
              </a>
              {" "}
            </span>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(14px,2vw,20px) clamp(18px,3.4vw,52px)","display":"flex","gap":"clamp(16px,3vw,36px)","alignItems":"center","flexWrap":"wrap"}}>
          {" "}
          <a href="#top" style={{"display":"flex","alignItems":"center","gap":"clamp(10px,2vw,16px)","textDecoration":"none","color":"inherit","flex":"0 1 auto","minWidth":"0"}}>
            {" "}
            <img src="/assets/img-03-55c76a.png" alt="Arundhati Gurukulam" style={{"height":"clamp(54px,10vw,82px)","width":"auto","flex":"0 0 auto"}} />
            {" "}
            <span style={{"display":"flex","flexDirection":"column","gap":"3px","lineHeight":"1.1","minWidth":"0"}}>
              {" "}
              <span style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(18px,4vw,27px)","color":"var(--color-accent-800)","letterSpacing":"-.01em"}}>
                {"Arundhati Gurukulam"}
              </span>
              {" "}
              <span style={{"fontSize":"clamp(9.5px,2.2vw,11px)","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
                {"Shankarapuram · Bengaluru"}
              </span>
              {" "}
            </span>
            {" "}
          </a>
          {" "}
          {(v.compact) ? (<>
            {" "}
            <button aria-label="Menu" onClick={v.toggleMobile} style={{"marginLeft":"auto","flex":"0 0 auto","width":"48px","height":"48px","borderRadius":"999px","border":"1px solid var(--color-divider)","background":"none","color":"var(--color-accent-800)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}} className={cx(pc("hover", "background:var(--color-accent-2-100)"))}>
              {" "}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18"></path>
              </svg>
              {" "}
            </button>
            {" "}
          </>) : null}
          {" "}
          <div style={css(`display:${S(v.navDisplay)};margin-left:auto;gap:26px;align-items:center;flex:0 0 auto`)}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"2px","textAlign":"right"}}>
              {" "}
              <span style={{"fontSize":"10.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
                {"Admissions open"}
              </span>
              {" "}
              <span style={{"fontFamily":"var(--font-heading)","fontSize":"17px","color":"var(--color-accent-800)"}}>
                {"2027–28"}
              </span>
              {" "}
            </div>
            {" "}
            <a href="/admissions" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 26px","fontSize":"14.5px"}} className={cx("btn btn-primary")}>
              {"Enquire"}
            </a>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </header>
      {" "}
      <div id="mainnav" style={css(`display:${S(v.bandDisplay)};position:sticky;top:0;z-index:60;background:var(--color-accent);border-top:1px solid color-mix(in srgb,var(--color-accent-900) 30%,transparent)`)}>
        {" "}
        <nav style={{"display":"flex","maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"0 clamp(18px,3.4vw,52px)","gap":"clamp(4px,1vw,14px)","alignItems":"stretch","fontSize":"14px","fontWeight":"600","whiteSpace":"nowrap"}}>
          {" "}
          <a href="#top" onMouseEnter={v.closeMenu} style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"15px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Home"}
          </a>
          {" "}
          <button onMouseEnter={v.openAbout} onClick={v.openAbout} style={css(`background:${S(v.aboutBg)};border:0;font:inherit;color:var(--color-accent-2-100);cursor:pointer;padding:15px 12px;display:flex;gap:7px;align-items:center`)} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"About Us "}
            <span style={{"fontSize":"9px","opacity":".6"}}>
              {"▼"}
            </span>
          </button>
          {" "}
          <button onMouseEnter={v.openAcademics} onClick={v.openAcademics} style={css(`background:${S(v.academicsBg)};border:0;font:inherit;color:var(--color-accent-2-100);cursor:pointer;padding:15px 12px;display:flex;gap:7px;align-items:center`)} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Academics "}
            <span style={{"fontSize":"9px","opacity":".6"}}>
              {"▼"}
            </span>
          </button>
          {" "}
          <button onMouseEnter={v.openLife} onClick={v.openLife} style={css(`background:${S(v.lifeBg)};border:0;font:inherit;color:var(--color-accent-2-100);cursor:pointer;padding:15px 12px;display:flex;gap:7px;align-items:center`)} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Gurukulam Life "}
            <span style={{"fontSize":"9px","opacity":".6"}}>
              {"▼"}
            </span>
          </button>
          {" "}
          <a href="/admissions" onMouseEnter={v.openAdm} style={css(`background:${S(v.admBg)};text-decoration:none;color:var(--color-accent-2-100);padding:15px 12px;display:flex;gap:7px;align-items:center`)} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Admissions "}
            <span style={{"fontSize":"9px","opacity":".6"}}>
              {"▼"}
            </span>
          </a>
          {" "}
          <button onMouseEnter={v.openMedia} onClick={v.openMedia} style={css(`background:${S(v.mediaBg)};border:0;font:inherit;color:var(--color-accent-2-100);cursor:pointer;padding:15px 12px;display:flex;gap:7px;align-items:center`)} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Media "}
            <span style={{"fontSize":"9px","opacity":".6"}}>
              {"▼"}
            </span>
          </button>
          {" "}
          <a href="/contact" onMouseEnter={v.closeMenu} style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"15px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Contact"}
          </a>
          {" "}
          <a href="/mandatory-disclosure" onMouseEnter={v.closeMenu} style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"15px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Mandatory Disclosure"}
          </a>
          {" "}
        </nav>
        {" "}
        {(v.megaOpen) ? (<>
          {" "}
          <div onMouseLeave={v.closeMenu} style={{"position":"absolute","left":"0","right":"0","top":"100%","background":"var(--color-neutral-100)","borderTop":"1px solid var(--color-divider)","boxShadow":"var(--shadow-lg)","zIndex":"70"}}>
            {" "}
            <div style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(26px,3vw,38px) clamp(18px,3.4vw,52px)","display":"grid","gridTemplateColumns":"minmax(0,1fr) minmax(0,1.35fr)","gap":"clamp(28px,4vw,56px)"}}>
              {" "}
              <div style={{"display":"flex","flexDirection":"column","gap":"12px","minWidth":"0"}}>
                {" "}
                <span style={{"fontSize":"11px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                  {I(v.megaKicker)}
                </span>
                {" "}
                <h3 style={{"margin":"0","fontSize":"clamp(22px,2.2vw,28px)","lineHeight":"1.08","letterSpacing":"-.01em"}}>
                  {I(v.megaTitle)}
                </h3>
                {" "}
                <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-700)","maxWidth":"40ch"}}>
                  {I(v.megaBlurb)}
                </p>
                {" "}
                <a href={v.megaHref} onClick={v.closeMenu} style={{"fontSize":"14.5px","fontWeight":"600","textDecoration":"none","marginTop":"2px"}}>
                  {I(v.megaCta)}{" →"}
                </a>
                {" "}
              </div>
              {" "}
              <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(190px,100%),1fr))","gap":"clamp(20px,2.4vw,34px)","minWidth":"0"}}>
                {" "}
                {L(v.megaGroups).map((group, $i2) => { const $index = $i2; return (<React.Fragment key={$i2}>
                  {" "}
                  <div style={{"display":"flex","flexDirection":"column","gap":"9px","minWidth":"0"}}>
                    {" "}
                    <span style={{"fontSize":"10.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-neutral-600)","paddingBottom":"4px","borderBottom":"1px solid var(--color-divider)"}}>
                      {I(group?.label)}
                    </span>
                    {" "}
                    {L(group?.items).map((item, $i3) => { const $index = $i3; return (<React.Fragment key={$i3}>
                      {" "}
                      <a href={item?.href} onClick={v.closeMenu} style={{"fontSize":"14.5px","fontWeight":"600","textDecoration":"none","color":"var(--color-text)","padding":"3px 0"}} className={cx(pc("hover", "color:var(--color-accent-700)"))}>
                        {I(item?.label)}
                      </a>
                      {" "}
                    </React.Fragment>); })}
                    {" "}
                  </div>
                  {" "}
                </React.Fragment>); })}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
      </div>
      {" "}
      {(v.mobileOpen) ? (<>
        {" "}
        <div style={{"borderTop":"1px solid var(--color-divider)","background":"var(--color-neutral-100)","padding":"14px clamp(18px,3.4vw,52px) 22px","display":"flex","flexDirection":"column","gap":"2px","fontSize":"15.5px","fontWeight":"600"}}>
          {" "}
          <span style={{"fontSize":"10.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-700)","padding":"10px 0 4px"}}>
            {"About us"}
          </span>
          {" "}
          <a href="#story" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Our Story"}
          </a>
          {" "}
          <a href="#pillars" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Vision, Mission & Values"}
          </a>
          {" "}
          <a href="#story" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Faculty"}
          </a>
          {" "}
          <a href="#story" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Founder's Message"}
          </a>
          {" "}
          <span style={{"fontSize":"10.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-700)","padding":"14px 0 4px"}}>
            {"Academics"}
          </span>
          {" "}
          <a href="#learning" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Curriculum"}
          </a>
          {" "}
          <a href="#learning" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Learning Spaces"}
          </a>
          {" "}
          <a href="#life" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Beyond the Classroom"}
          </a>
          {" "}
          <span style={{"fontSize":"10.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-700)","padding":"14px 0 4px"}}>
            {"Gurukulam life"}
          </span>
          {" "}
          <a href="#life" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"A Day Here"}
          </a>
          {" "}
          <a href="#life" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Meals, Health & Yoga"}
          </a>
          {" "}
          <a href="/contact" style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Transport & Safety"}
          </a>
          {" "}
          <span style={{"fontSize":"10.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-700)","padding":"14px 0 4px"}}>
            {"Admissions & media"}
          </span>
          {" "}
          <a href="/admissions" style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Admissions 2027–28"}
          </a>
          {" "}
          <a href="/admissions" style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Eligibility & Documents"}
          </a>
          {" "}
          <a href="#news" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"News & Events"}
          </a>
          {" "}
          <a href="#life" onClick={v.closeMobile} style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Photo Gallery"}
          </a>
          {" "}
          <a href="/contact" style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Contact"}
          </a>
          {" "}
          <a href="/mandatory-disclosure" style={{"padding":"9px 0","textDecoration":"none","color":"var(--color-text)"}}>
            {"Mandatory Disclosure"}
          </a>
          {" "}
          <a href="/admissions" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 24px","fontSize":"15px","marginTop":"16px","alignSelf":"flex-start"}} className={cx("btn btn-primary")}>
            {"Enquire"}
          </a>
          {" "}
        </div>
        {" "}
      </>) : null}
      {" "}
      <div style={css(`display:${S(v.railDisplay)};position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:70;flex-direction:column;gap:2px;border-radius:14px 0 0 14px;overflow:hidden;box-shadow:var(--shadow-md)`)}>
        {" "}
        <a href="/contact" aria-label="WhatsApp" style={{"width":"42px","height":"42px","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-accent-900)","color":"var(--color-accent-2-200)"}} className={cx(pc("hover", "background:var(--color-accent-2-500);color:var(--color-accent-900)"))}>
          {" "}
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.55 3.75 1.5 5.29L2 22l4.98-1.63a9.84 9.84 0 0 0 5.06 1.4c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm5.7 13.93c-.24.67-1.4 1.29-1.93 1.34-.53.05-1.02.07-1.74-.19-.42-.15-.97-.33-1.67-.64-2.95-1.28-4.88-4.26-5.03-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.17 1.03-2.46.27-.3.58-.37.78-.37s.4 0 .57.01c.18.01.43-.07.67.51.24.58.83 2.02.9 2.17.07.15.12.32.02.52-.1.2-.36.53-.58.77-.15.16-.32.34-.14.66.18.32.8 1.32 1.72 2.14 1.18 1.05 2.07 1.37 2.37 1.52.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.4-.25.68-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.74-.17 1.41Z"></path>
          </svg>
          {" "}
        </a>
        {" "}
        <a href="#news" aria-label="Instagram" style={{"width":"42px","height":"42px","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-accent-900)","color":"var(--color-accent-2-200)"}} className={cx(pc("hover", "background:var(--color-accent-2-500);color:var(--color-accent-900)"))}>
          {" "}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="5.5"></rect>
            <circle cx="12" cy="12" r="3.6"></circle>
            <circle cx="17.3" cy="6.7" r="1.05" fill="currentColor" stroke="none"></circle>
          </svg>
          {" "}
        </a>
        {" "}
        <a href="#news" aria-label="YouTube" style={{"width":"42px","height":"42px","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-accent-900)","color":"var(--color-accent-2-200)"}} className={cx(pc("hover", "background:var(--color-accent-2-500);color:var(--color-accent-900)"))}>
          {" "}
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.85 12 4.85 12 4.85s-6 0-7.7.45A2.7 2.7 0 0 0 2.4 7.2C2 8.9 2 12 2 12s0 3.1.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.45 7.7.45 7.7.45s6 0 7.7-.45a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8ZM10.1 15.2V8.8L15.6 12l-5.5 3.2Z"></path>
          </svg>
          {" "}
        </a>
        {" "}
        <a href="#news" aria-label="Facebook" style={{"width":"42px","height":"42px","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-accent-900)","color":"var(--color-accent-2-200)"}} className={cx(pc("hover", "background:var(--color-accent-2-500);color:var(--color-accent-900)"))}>
          {" "}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.36c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.94 1.43-3.94 4.05v2.11H8v3h2.3V21h3.2Z"></path>
          </svg>
          {" "}
        </a>
        {" "}
      </div>
      {" "}
      <div style={{"position":"relative","zIndex":"40","background":"var(--color-accent-900)","color":"var(--color-accent-2-200)","overflow":"hidden"}}>
        {" "}
        <div style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"0 clamp(18px,3.4vw,52px)","display":"flex","alignItems":"stretch"}}>
          {" "}
          <span style={{"flex":"0 0 auto","display":"flex","alignItems":"center","gap":"9px","background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","padding":"9px 18px","fontSize":"11.5px","fontWeight":"700","letterSpacing":".16em","textTransform":"uppercase","whiteSpace":"nowrap"}}>
            {" "}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" style={{"animation":"agni-blink 2.4s ease-in-out infinite"}}>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              <path d="M21 18H3l1.8-2.7A9 9 0 0 0 6 10.5V9a6 6 0 0 1 12 0v1.5a9 9 0 0 0 1.2 4.8L21 18Z"></path>
            </svg>
            {"\n        Announcements\n      "}
          </span>
          {" "}
          <div style={{"flex":"1 1 auto","minWidth":"0","overflow":"hidden","display":"flex","alignItems":"center","maskImage":"linear-gradient(90deg,transparent,#000 3%,#000 95%,transparent)","WebkitMaskImage":"linear-gradient(90deg,transparent,#000 3%,#000 95%,transparent)"}}>
            {" "}
            <div style={{"display":"flex","whiteSpace":"nowrap","animation":"agni-marquee-x 48s linear infinite"}} className={cx(pc("hover", "animation-play-state:paused"))}>
              {" "}
              {L(v.ticker).map((t, $i4) => { const $index = $i4; return (<React.Fragment key={$i4}>
                {" "}
                <a href="#notices" style={{"display":"inline-flex","alignItems":"center","gap":"12px","padding":"9px 20px","fontSize":"13.5px","color":"var(--color-accent-2-200)","textDecoration":"none"}} className={cx(pc("hover", "color:var(--color-accent-2-400)"))}>
                  <span style={{"color":"var(--color-accent-2-500)"}}>
                    {"◆"}
                  </span>
                  {I(t?.text)}
                </a>
                {" "}
              </React.Fragment>); })}
              {" "}
              {L(v.ticker).map((t, $i5) => { const $index = $i5; return (<React.Fragment key={$i5}>
                {" "}
                <a href="#notices" style={{"display":"inline-flex","alignItems":"center","gap":"12px","padding":"9px 20px","fontSize":"13.5px","color":"var(--color-accent-2-200)","textDecoration":"none"}} className={cx(pc("hover", "color:var(--color-accent-2-400)"))}>
                  <span style={{"color":"var(--color-accent-2-500)"}}>
                    {"◆"}
                  </span>
                  {I(t?.text)}
                </a>
                {" "}
              </React.Fragment>); })}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
      <section id="top" data-main="1" style={{"position":"relative","overflow":"hidden","background":"var(--color-accent-900)","minHeight":"min(88vh,780px)","display":"flex","flexDirection":"column","justifyContent":"flex-end"}}>
        {" "}
        <div style={{"position":"absolute","inset":"0","overflow":"hidden"}}>
          {" "}
          <div style={css(`position:absolute;inset:0;opacity:${S(v.slide0)};transition:opacity 1.4s ease`)}>
            {" "}
            <div style={{"width":"100%","height":"100%","animation":"agni-ken 26s ease-in-out infinite alternate"}}>
              {" "}
              <img src="/images/hero-b.webp" alt="Morning assembly in the gurukulam courtyard" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={css(`position:absolute;inset:0;opacity:${S(v.slide1)};transition:opacity 1.4s ease`)}>
            {" "}
            <div style={{"width":"100%","height":"100%","animation":"agni-ken 26s ease-in-out infinite alternate-reverse"}}>
              {" "}
              <img src="/images/hero-c.webp" alt="A teacher helping students in the classroom" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={css(`position:absolute;inset:0;opacity:${S(v.slide2)};transition:opacity 1.4s ease`)}>
            {" "}
            <div style={{"width":"100%","height":"100%","animation":"agni-ken 26s ease-in-out infinite alternate"}}>
              {" "}
              <img src="/images/hero-a.webp" alt="Students walking across the courtyard" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{"position":"absolute","inset":"0","background":"linear-gradient(180deg,color-mix(in srgb,var(--color-accent-900) 62%,transparent) 0%,color-mix(in srgb,var(--color-accent-900) 34%,transparent) 34%,color-mix(in srgb,var(--color-accent-900) 88%,transparent) 100%)","pointerEvents":"none"}}></div>
        {" "}
        <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","right":"-12%","top":"-30%","width":"min(780px,72%)","opacity":".12","animation":"agni-spin 300s linear infinite","pointerEvents":"none"}} />
        {" "}
        <div style={{"position":"relative","width":"100%","maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(120px,16vh,190px) clamp(18px,3.4vw,52px) clamp(26px,3vw,38px)","boxSizing":"border-box","display":"flex","flexDirection":"column","gap":"clamp(20px,2.6vw,30px)"}}>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"18px","maxWidth":"min(660px,94%)","animation":"agni-hero-in 1s cubic-bezier(.22,1,.36,1) both"}}>
            {" "}
            <div style={{"display":"flex","gap":"8px","flexWrap":"wrap"}}>
              {" "}
              <span style={{"background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","borderRadius":"999px","whiteSpace":"nowrap","padding":"7px 16px","fontSize":"11.5px","fontWeight":"700","letterSpacing":".12em","textTransform":"uppercase"}}>
                {"Nursery – Grade 10"}
              </span>
              {" "}
              <span style={{"border":"1px solid var(--color-accent-2-300)","color":"var(--color-accent-2-200)","borderRadius":"999px","whiteSpace":"nowrap","padding":"7px 16px","fontSize":"11.5px","letterSpacing":".12em","textTransform":"uppercase"}}>
                {"Admissions open"}
              </span>
              {" "}
            </div>
            {" "}
            <h1 style={{"margin":"0","fontSize":"clamp(34px,5.4vw,68px)","lineHeight":"1","letterSpacing":"-.02em","color":"var(--color-bg)","textWrap":"balance"}}>
              {"Rooted in character."}
              <br />
              {"Inspired by wisdom."}
            </h1>
            {" "}
            <div style={{"display":"flex","gap":"16px","flexWrap":"wrap","alignItems":"center","fontFamily":"var(--font-devanagari)","fontSize":"clamp(16px,1.5vw,20px)","color":"var(--color-accent-2-300)"}}>
              {" "}
              <span>
                {"सुरक्षिता"}
              </span>
              <span style={{"opacity":".5"}}>
                {"·"}
              </span>
              <span>
                {"सुशिक्षिता"}
              </span>
              <span style={{"opacity":".5"}}>
                {"·"}
              </span>
              <span>
                {"सुशीला"}
              </span>
              {" "}
            </div>
            {" "}
            <p style={{"margin":"0","maxWidth":"46ch","fontSize":"clamp(15.5px,1.2vw,17.5px)","lineHeight":"1.6","color":"var(--color-bg)"}}>
              {"A day school in Basavanagudi where the Indian knowledge traditions and a modern academic curriculum are taught as one thing, not two."}
            </p>
            {" "}
            <div style={{"display":"flex","gap":"12px","flexWrap":"wrap","marginTop":"2px"}}>
              {" "}
              <a href="#admissions" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"15px 30px","fontSize":"15px","background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","borderColor":"var(--color-accent-2-500)","fontWeight":"600"}} className={cx("btn")}>
                {"Begin an enquiry"}
              </a>
              {" "}
              <a href="#story" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"15px 30px","fontSize":"15px","background":"transparent","borderColor":"var(--color-accent-2-200)","color":"var(--color-bg)"}} className={cx("btn")}>
                {"Our story"}
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{"display":"flex","gap":"9px","alignItems":"center"}}>
            {" "}
            <button aria-label="Slide 1" onClick={v.go0} style={css(`width:38px;height:6px;border-radius:999px;border:0;cursor:pointer;padding:0;background:${S(v.dot0)}`)}></button>
            {" "}
            <button aria-label="Slide 2" onClick={v.go1} style={css(`width:38px;height:6px;border-radius:999px;border:0;cursor:pointer;padding:0;background:${S(v.dot1)}`)}></button>
            {" "}
            <button aria-label="Slide 3" onClick={v.go2} style={css(`width:38px;height:6px;border-radius:999px;border:0;cursor:pointer;padding:0;background:${S(v.dot2)}`)}></button>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{"position":"relative","width":"100%","maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"0 clamp(18px,3.4vw,52px) clamp(26px,3vw,40px)","boxSizing":"border-box"}}>
          {" "}
          <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(200px,100%),1fr))","gap":"1px","background":"var(--color-divider)","borderRadius":"var(--radius-lg)","overflow":"hidden","boxShadow":"var(--shadow-lg)"}}>
            {" "}
            <a href="/admissions" style={{"minWidth":"0","display":"flex","alignItems":"center","gap":"14px","padding":"18px 20px","textDecoration":"none","color":"var(--color-text)","background":"var(--color-bg)","transition":"background .25s ease"}} className={cx(pc("hover", "background:var(--color-accent-2-200)"))}>
              {" "}
              <span style={{"flex":"0 0 auto","width":"40px","height":"40px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v13"></path>
                  <path d="m7 11 5 5 5-5"></path>
                  <path d="M4 20h16"></path>
                </svg>
                {" "}
              </span>
              {" "}
              <span style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"3px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"16.5px","lineHeight":"1.15"}}>
                  {"Admissions 2027–28"}
                </span>
                {" "}
                <span style={{"fontSize":"12.5px","color":"var(--color-neutral-700)"}}>
                  {"Apply or visit"}
                </span>
                {" "}
              </span>
              {" "}
            </a>
            {" "}
            <a href="#learning" style={{"minWidth":"0","display":"flex","alignItems":"center","gap":"14px","padding":"18px 20px","textDecoration":"none","color":"var(--color-text)","background":"var(--color-bg)","transition":"background .25s ease"}} className={cx(pc("hover", "background:var(--color-accent-2-200)"))}>
              {" "}
              <span style={{"flex":"0 0 auto","width":"40px","height":"40px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"></path>
                  <path d="M9 8h7"></path>
                  <path d="M9 12h5"></path>
                </svg>
                {" "}
              </span>
              {" "}
              <span style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"3px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"16.5px","lineHeight":"1.15"}}>
                  {"The curriculum"}
                </span>
                {" "}
                <span style={{"fontSize":"12.5px","color":"var(--color-neutral-700)"}}>
                  {"Sanskrit & academics"}
                </span>
                {" "}
              </span>
              {" "}
            </a>
            {" "}
            <a href="#notices" style={{"minWidth":"0","display":"flex","alignItems":"center","gap":"14px","padding":"18px 20px","textDecoration":"none","color":"var(--color-text)","background":"var(--color-bg)","transition":"background .25s ease"}} className={cx(pc("hover", "background:var(--color-accent-2-200)"))}>
              {" "}
              <span style={{"flex":"0 0 auto","width":"40px","height":"40px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="16" rx="3"></rect>
                  <path d="M8 3v4"></path>
                  <path d="M16 3v4"></path>
                  <path d="M3 11h18"></path>
                </svg>
                {" "}
              </span>
              {" "}
              <span style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"3px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"16.5px","lineHeight":"1.15"}}>
                  {"Term calendar"}
                </span>
                {" "}
                <span style={{"fontSize":"12.5px","color":"var(--color-neutral-700)"}}>
                  {"Dates and holidays"}
                </span>
                {" "}
              </span>
              {" "}
            </a>
            {" "}
            <a href="/contact" style={{"minWidth":"0","display":"flex","alignItems":"center","gap":"14px","padding":"18px 20px","textDecoration":"none","color":"var(--color-text)","background":"var(--color-bg)","transition":"background .25s ease"}} className={cx(pc("hover", "background:var(--color-accent-2-200)"))}>
              {" "}
              <span style={{"flex":"0 0 auto","width":"40px","height":"40px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="2.8"></circle>
                </svg>
                {" "}
              </span>
              {" "}
              <span style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"3px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"16.5px","lineHeight":"1.15"}}>
                  {"Come and see"}
                </span>
                {" "}
                <span style={{"fontSize":"12.5px","color":"var(--color-neutral-700)"}}>
                  {"Weekday mornings"}
                </span>
                {" "}
              </span>
              {" "}
            </a>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="story" style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(34px,3.6vw,54px) clamp(18px,3.4vw,52px)","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(320px,100%),1fr))","gap":"clamp(24px,3vw,44px)","alignItems":"start"}}>
        {" "}
        <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"16px"}}>
          {" "}
          <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Who we are"}
          </span>
          {" "}
          <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.08","textWrap":"pretty"}}>
            {"A gurukulam, kept in the middle of the city"}
          </h2>
          {" "}
          <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.62","color":"var(--color-neutral-800)","maxWidth":"60ch"}}>
            {"Arundhati Gurukulam sits in the Uttaradi Math compound at Shankarapuram, a few streets from Basavanagudi. Children come each morning from across Bengaluru and go home each evening, but the day between belongs to an older way of learning."}
          </p>
          {" "}
          <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.62","color":"var(--color-neutral-800)","maxWidth":"60ch"}}>
            {"Sanskrit, Veda and the shastras are taught alongside mathematics, the sciences and languages — by the same teachers, in the same timetable, to the same standard. The three words on our seal describe what we want a child to be when they leave: protected, well taught, and of good character."}
          </p>
          {" "}
          <a href="#pillars" style={{"fontSize":"15px","whiteSpace":"nowrap","alignSelf":"flex-start"}} className={cx("btn btn-ghost")}>
            {"Vision, mission and values →"}
          </a>
          {" "}
        </div>
        {" "}
        <figure style={{"minWidth":"0","margin":"0","display":"flex","flexDirection":"column","gap":"10px"}}>
          {" "}
          <div style={{"borderRadius":"var(--radius-lg)","overflow":"hidden","aspectRatio":"4/3","maxHeight":"380px","background":"var(--color-surface)"}} className={cx("washed")}>
            {" "}
            <img src="/images/story-photo.webp" alt="Children reading together on the courtyard steps" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
            {" "}
          </div>
          {" "}
          <figcaption style={{"fontSize":"13px","color":"var(--color-neutral-600)"}}>
            {"The courtyard at Raghavasadanam."}
          </figcaption>
          {" "}
        </figure>
        {" "}
      </section>
      {" "}
      <section id="pillars" style={{"position":"relative","overflow":"hidden","background":"var(--color-accent-2-100)","padding":"clamp(44px,5vw,74px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <img src="/assets/img-04-9da6d0.png" alt="" style={{"position":"absolute","left":"-16%","top":"-52%","width":"min(720px,62%)","opacity":".08","pointerEvents":"none"}} />
        {" "}
        <div style={{"position":"relative","maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"clamp(28px,4vw,48px)"}}>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"62ch"}}>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-800)"}}>
              {"Our values"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.08","color":"var(--color-accent-900)"}}>
              {"Three words on the seal"}
            </h2>
            {" "}
          </div>
          {" "}
          <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(280px,100%),1fr))","gap":"20px"}}>
            {" "}
            <article style={{"background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","display":"flex","flexDirection":"column","gap":"12px","boxShadow":"var(--shadow-sm)"}}>
              {" "}
              <span style={{"width":"58px","height":"58px","borderRadius":"999px","background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center","fontFamily":"var(--font-devanagari)","fontSize":"21px"}}>
                {"सु"}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"21px"}}>
                {"Surakshita"}
              </h3>
              {" "}
              <div style={{"fontFamily":"var(--font-devanagari)","fontSize":"18px","color":"var(--color-accent-700)"}}>
                {"सुरक्षिता"}
              </div>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"Protected. A small school, known faces, and an adult responsible for every child at every hour of the day."}
              </p>
              {" "}
            </article>
            {" "}
            <article style={{"background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","display":"flex","flexDirection":"column","gap":"12px","boxShadow":"var(--shadow-sm)"}}>
              {" "}
              <span style={{"width":"58px","height":"58px","borderRadius":"999px","background":"var(--color-accent)","color":"var(--color-accent-2-200)","display":"flex","alignItems":"center","justifyContent":"center","fontFamily":"var(--font-devanagari)","fontSize":"21px"}}>
                {"शि"}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"21px"}}>
                {"Sushikshita"}
              </h3>
              {" "}
              <div style={{"fontFamily":"var(--font-devanagari)","fontSize":"18px","color":"var(--color-accent-700)"}}>
                {"सुशिक्षिता"}
              </div>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"Well taught. Recitation and reasoning held together — memory trained early, argument trained soon after."}
              </p>
              {" "}
            </article>
            {" "}
            <article style={{"background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","display":"flex","flexDirection":"column","gap":"12px","boxShadow":"var(--shadow-sm)"}}>
              {" "}
              <span style={{"width":"58px","height":"58px","borderRadius":"999px","background":"var(--color-accent-700)","color":"var(--color-accent-2-200)","display":"flex","alignItems":"center","justifyContent":"center","fontFamily":"var(--font-devanagari)","fontSize":"21px"}}>
                {"शी"}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"21px"}}>
                {"Susheela"}
              </h3>
              {" "}
              <div style={{"fontFamily":"var(--font-devanagari)","fontSize":"18px","color":"var(--color-accent-700)"}}>
                {"सुशीला"}
              </div>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"Of good character. Conduct is taught as a subject and marked as one — in how a child speaks, listens and waits."}
              </p>
              {" "}
            </article>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section data-counters="1" style={{"background":"var(--color-accent)","color":"var(--color-bg)","padding":"clamp(34px,3.6vw,56px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(148px,100%),1fr))","gap":"clamp(18px,2vw,30px)"}}>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
            {" "}
            <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"color-mix(in srgb,var(--color-accent-900) 45%,transparent)","color":"var(--color-accent-2-400)","display":"flex","alignItems":"center","justifyContent":"center"}}>
              {" "}
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"></path>
                <path d="M12 7.5v6"></path>
                <path d="m5.5 9 6.5 2 6.5-2"></path>
                <path d="m9 22 3-8 3 8"></path>
              </svg>
              {" "}
            </span>
            {" "}
            <span data-count="0" style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(27px,2.3vw,37px)","lineHeight":"1","color":"var(--color-accent-2-400)"}}>
              {I(v.c0)}
            </span>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","lineHeight":"1.4"}}>
              {"Students on roll"}
            </span>
            {" "}
          </div>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
            {" "}
            <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"color-mix(in srgb,var(--color-accent-900) 45%,transparent)","color":"var(--color-accent-2-400)","display":"flex","alignItems":"center","justifyContent":"center"}}>
              {" "}
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v13H6.5A2.5 2.5 0 0 0 4 19.5Z"></path>
                <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20"></path>
              </svg>
              {" "}
            </span>
            {" "}
            <span data-count="1" style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(27px,2.3vw,37px)","lineHeight":"1","color":"var(--color-accent-2-400)"}}>
              {I(v.c1)}
            </span>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","lineHeight":"1.4"}}>
              {"Acharyas & teachers"}
            </span>
            {" "}
          </div>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
            {" "}
            <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"color-mix(in srgb,var(--color-accent-900) 45%,transparent)","color":"var(--color-accent-2-400)","display":"flex","alignItems":"center","justifyContent":"center"}}>
              {" "}
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 20v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2"></path>
                <circle cx="10.5" cy="7.5" r="3.5"></circle>
                <path d="M20 20v-2a3 3 0 0 0-2.2-2.9"></path>
                <path d="M15.5 4.2a3.5 3.5 0 0 1 0 6.6"></path>
              </svg>
              {" "}
            </span>
            {" "}
            <span data-count="2" style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(27px,2.3vw,37px)","lineHeight":"1","color":"var(--color-accent-2-400)"}}>
              {I(v.c2)}
            </span>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","lineHeight":"1.4"}}>
              {"Children per class"}
            </span>
            {" "}
          </div>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
            {" "}
            <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"color-mix(in srgb,var(--color-accent-900) 45%,transparent)","color":"var(--color-accent-2-400)","display":"flex","alignItems":"center","justifyContent":"center"}}>
              {" "}
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 20v-1.5A3.5 3.5 0 0 1 6.5 15h2A3.5 3.5 0 0 1 12 18.5V20"></path>
                <circle cx="7.5" cy="8" r="3.5"></circle>
                <path d="M16 5h5"></path>
                <path d="M16 11h5"></path>
                <path d="M16 17h5"></path>
              </svg>
              {" "}
            </span>
            {" "}
            <span data-count="3" style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(27px,2.3vw,37px)","lineHeight":"1","color":"var(--color-accent-2-400)"}}>
              {I(v.c3)}
            </span>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","lineHeight":"1.4"}}>
              {"Student to teacher"}
            </span>
            {" "}
          </div>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
            {" "}
            <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"color-mix(in srgb,var(--color-accent-900) 45%,transparent)","color":"var(--color-accent-2-400)","display":"flex","alignItems":"center","justifyContent":"center"}}>
              {" "}
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8h10"></path>
                <path d="M10 5.5V8c0 4.4-2.5 7.5-6 9"></path>
                <path d="M8 12.5c0 2.6 2.4 4.9 6 5.5"></path>
                <path d="m13.5 20 4-9 4 9"></path>
                <path d="M15 17h5"></path>
              </svg>
              {" "}
            </span>
            {" "}
            <span data-count="4" style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(27px,2.3vw,37px)","lineHeight":"1","color":"var(--color-accent-2-400)"}}>
              {I(v.c4)}
            </span>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","lineHeight":"1.4"}}>
              {"Languages from Grade 1"}
            </span>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="learning" style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(340px,100%),1fr))","gap":"clamp(28px,4vw,64px)","alignItems":"center"}}>
        {" "}
        <figure style={{"minWidth":"0","margin":"0","borderRadius":"var(--radius-lg)","overflow":"hidden","aspectRatio":"4/3","background":"var(--color-surface)","order":"0"}} className={cx("washed")}>
          {" "}
          <img src="/images/learning-photo.webp" alt="A Sanskrit class seated on mats in the hall" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
          {" "}
        </figure>
        {" "}
        <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"18px"}}>
          {" "}
          <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Learning"}
          </span>
          {" "}
          <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.08","textWrap":"pretty"}}>
            {"One timetable, two inheritances"}
          </h2>
          {" "}
          <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.62","color":"var(--color-neutral-800)","maxWidth":"58ch"}}>
            {"The morning belongs to recitation and Sanskrit. The rest of the day runs the standard academic subjects, with the arts, yoga and games woven in rather than added on."}
          </p>
          {" "}
          <div style={{"display":"flex","flexWrap":"wrap","gap":"9px","whiteSpace":"nowrap"}}>
            {" "}
            <span className={cx("tag tag-accent")}>
              {"Sanskrit & Veda"}
            </span>
            {" "}
            <span className={cx("tag tag-neutral")}>
              {"Mathematics"}
            </span>
            {" "}
            <span className={cx("tag tag-neutral")}>
              {"Science"}
            </span>
            {" "}
            <span className={cx("tag tag-neutral")}>
              {"English & Kannada"}
            </span>
            {" "}
            <span className={cx("tag tag-neutral")}>
              {"Social studies"}
            </span>
            {" "}
            <span className={cx("tag tag-accent-2")}>
              {"Music & the arts"}
            </span>
            {" "}
            <span className={cx("tag tag-accent-2")}>
              {"Yoga & games"}
            </span>
            {" "}
          </div>
          {" "}
          <a href="#admissions" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 26px","fontSize":"15px","alignSelf":"flex-start"}} className={cx("btn btn-primary")}>
            {"See the curriculum"}
          </a>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"0 clamp(18px,3.4vw,52px) clamp(38px,4.2vw,64px)","display":"flex","flexDirection":"column","gap":"clamp(24px,3vw,40px)"}}>
        {" "}
        <div style={{"display":"flex","flexDirection":"column","gap":"11px","maxWidth":"56ch"}}>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Our process"}
          </span>
          {" "}
          <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.04","letterSpacing":"-.015em"}}>
            {"Four stages, Nursery to Grade 10"}
          </h2>
          {" "}
        </div>
        {" "}
        <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(230px,100%),1fr))","gap":"20px"}}>
          {" "}
          <article style={{"borderTop":"3px solid var(--color-accent-2-500)","paddingTop":"20px","display":"flex","flexDirection":"column","gap":"9px"}}>
            {" "}
            <span style={{"fontFamily":"var(--font-heading)","fontSize":"34px","lineHeight":"1","color":"var(--color-accent-2-600)"}}>
              {"01"}
            </span>
            {" "}
            <h3 style={{"margin":"0","fontSize":"21px"}}>
              {"Bala"}
            </h3>
            {" "}
            <span style={{"fontSize":"12.5px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
              {"Nursery – LKG"}
            </span>
            {" "}
            <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
              {"Sound, song and story. The ear is trained before the pen, and the day is mostly play."}
            </p>
            {" "}
          </article>
          {" "}
          <article style={{"borderTop":"3px solid var(--color-accent-2-500)","paddingTop":"20px","display":"flex","flexDirection":"column","gap":"9px"}}>
            {" "}
            <span style={{"fontFamily":"var(--font-heading)","fontSize":"34px","lineHeight":"1","color":"var(--color-accent-2-600)"}}>
              {"02"}
            </span>
            {" "}
            <h3 style={{"margin":"0","fontSize":"21px"}}>
              {"Prathama"}
            </h3>
            {" "}
            <span style={{"fontSize":"12.5px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
              {"Grade 1 – 5"}
            </span>
            {" "}
            <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
              {"Recitation and reading take hold, alongside number, language and the first shastras."}
            </p>
            {" "}
          </article>
          {" "}
          <article style={{"borderTop":"3px solid var(--color-accent-500)","paddingTop":"20px","display":"flex","flexDirection":"column","gap":"9px"}}>
            {" "}
            <span style={{"fontFamily":"var(--font-heading)","fontSize":"34px","lineHeight":"1","color":"var(--color-accent-600)"}}>
              {"03"}
            </span>
            {" "}
            <h3 style={{"margin":"0","fontSize":"21px"}}>
              {"Madhyama"}
            </h3>
            {" "}
            <span style={{"fontSize":"12.5px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
              {"Grade 6 – 8"}
            </span>
            {" "}
            <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
              {"Memory gives way to argument. Children learn to question a text and defend an answer."}
            </p>
            {" "}
          </article>
          {" "}
          <article style={{"borderTop":"3px solid var(--color-accent-500)","paddingTop":"20px","display":"flex","flexDirection":"column","gap":"9px"}}>
            {" "}
            <span style={{"fontFamily":"var(--font-heading)","fontSize":"34px","lineHeight":"1","color":"var(--color-accent-600)"}}>
              {"04"}
            </span>
            {" "}
            <h3 style={{"margin":"0","fontSize":"21px"}}>
              {"Uttama"}
            </h3>
            {" "}
            <span style={{"fontSize":"12.5px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
              {"Grade 9 – 10"}
            </span>
            {" "}
            <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
              {"Board examinations met without abandoning the tradition the child has grown up inside."}
            </p>
            {" "}
          </article>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="life" style={{"background":"var(--color-surface)","padding":"clamp(44px,5vw,74px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"clamp(26px,4vw,44px)"}}>
          {" "}
          <div style={{"display":"flex","flexWrap":"wrap","gap":"18px","alignItems":"flex-end","justifyContent":"space-between"}}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"56ch"}}>
              {" "}
              <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Gurukulam life"}
              </span>
              {" "}
              <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.08"}}>
                {"A day here, end to end"}
              </h2>
              {" "}
            </div>
            {" "}
            <a href="#life" style={{"fontSize":"15px","whiteSpace":"nowrap"}} className={cx("btn btn-ghost")}>
              {"Open the gallery →"}
            </a>
            {" "}
          </div>
          {" "}
          <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(260px,100%),1fr))","gap":"20px"}}>
            {" "}
            <figure style={{"margin":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
              {" "}
              <div style={{"borderRadius":"var(--radius-lg)","overflow":"hidden","aspectRatio":"1/1","background":"var(--color-neutral-200)"}}>
                {" "}
                <img src="/images/life-1.webp" alt="Children at morning prayer before a brass lamp" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
                {" "}
              </div>
              {" "}
              <figcaption style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"20px"}}>
                  {"Morning"}
                </span>
                {" "}
                <span style={{"fontSize":"14.5px","color":"var(--color-neutral-700)"}}>
                  {"Prayer, recitation and the day's first reading, together in the hall."}
                </span>
                {" "}
              </figcaption>
              {" "}
            </figure>
            {" "}
            <figure style={{"margin":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
              {" "}
              <div style={{"borderRadius":"var(--radius-lg)","overflow":"hidden","aspectRatio":"1/1","background":"var(--color-neutral-200)"}}>
                {" "}
                <img src="/images/life-2.webp" alt="A teacher helping students build a science model" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
                {" "}
              </div>
              {" "}
              <figcaption style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"20px"}}>
                  {"Midday"}
                </span>
                {" "}
                <span style={{"fontSize":"14.5px","color":"var(--color-neutral-700)"}}>
                  {"Academic periods, a shared meal, and a long enough break to play."}
                </span>
                {" "}
              </figcaption>
              {" "}
            </figure>
            {" "}
            <figure style={{"margin":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
              {" "}
              <div style={{"borderRadius":"var(--radius-lg)","overflow":"hidden","aspectRatio":"1/1","background":"var(--color-neutral-200)"}}>
                {" "}
                <img src="/images/life-3.webp" alt="Children playing veena and mridangam in the verandah" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
                {" "}
              </div>
              {" "}
              <figcaption style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"20px"}}>
                  {"Evening"}
                </span>
                {" "}
                <span style={{"fontSize":"14.5px","color":"var(--color-neutral-700)"}}>
                  {"Music, art and games before the walk home."}
                </span>
                {" "}
              </figcaption>
              {" "}
            </figure>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"background":"var(--color-accent-900)","color":"var(--color-accent-2-200)","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)","overflow":"hidden"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexWrap":"wrap","gap":"clamp(24px,4vw,56px)","alignItems":"center"}}>
          {" "}
          <div style={{"flex":"0 0 auto","width":"min(230px,100%)","aspectRatio":"1/1","borderRadius":"999px","background":"var(--color-accent-2-100)","display":"flex","alignItems":"center","justifyContent":"center","overflow":"hidden"}}>
            {" "}
            <img src="/assets/img-05-ae0620.png" alt="Saraswati" style={{"width":"78%","height":"auto","mixBlendMode":"multiply","opacity":".85"}} />
            {" "}
          </div>
          {" "}
          <div style={{"flex":"1 1 340px","minWidth":"0","display":"flex","flexDirection":"column","gap":"16px"}}>
            {" "}
            <div style={{"fontFamily":"var(--font-devanagari)","fontSize":"clamp(19px,1.6vw,24px)","lineHeight":"1.6"}}>
              {"या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता"}
            </div>
            {" "}
            <div style={{"fontSize":"15px","letterSpacing":".02em","opacity":".8","fontStyle":"italic"}}>
              {"yā kundendu-tuṣāra-hāra-dhavalā yā śubhra-vastrāvṛtā"}
            </div>
            {" "}
            <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.62","maxWidth":"56ch"}}>
              {"She who is white as jasmine, as the moon, as a garland of frost; she who is wrapped in white cloth. The invocation the school opens with each morning."}
            </p>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="notices" style={{"background":"var(--color-surface)","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"clamp(22px,3vw,34px)"}}>
          {" "}
          <div style={{"display":"flex","flexWrap":"wrap","gap":"18px","alignItems":"flex-end","justifyContent":"space-between"}}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"54ch"}}>
              {" "}
              <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Notice board"}
              </span>
              {" "}
              <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.08"}}>
                {"What families need to know this week"}
              </h2>
              {" "}
            </div>
            {" "}
            <button onClick={v.openCal} style={{"fontSize":"15px","whiteSpace":"nowrap","cursor":"pointer"}} className={cx("btn btn-ghost")}>
              {"Term calendar →"}
            </button>
            {" "}
          </div>
          {" "}
          <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(300px,100%),1fr))","gap":"20px"}}>
            {" "}
            {L(v.boards).map((b, $i6) => { const $index = $i6; return (<React.Fragment key={$i6}>
              {" "}
              <article style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","overflow":"hidden","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column"}}>
                {" "}
                <div style={{"background":"var(--color-accent-900)","padding":"15px 20px","display":"flex","alignItems":"center","gap":"12px"}}>
                  {" "}
                  <span style={{"fontFamily":"var(--font-heading)","fontSize":"18px","color":"var(--color-accent-2-300)"}}>
                    {I(b?.label)}
                  </span>
                  {" "}
                  <span style={{"marginLeft":"auto","background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","borderRadius":"999px","padding":"3px 10px","fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","whiteSpace":"nowrap"}}>
                    {I(b?.count)}
                  </span>
                  {" "}
                </div>
                {" "}
                <div style={{"position":"relative","height":"262px","overflow":"hidden","maskImage":"linear-gradient(180deg,transparent,#000 9%,#000 89%,transparent)","WebkitMaskImage":"linear-gradient(180deg,transparent,#000 9%,#000 89%,transparent)"}}>
                  {" "}
                  <div style={{"animation":"agni-marquee-y 34s linear infinite"}} className={cx(pc("hover", "animation-play-state:paused"))}>
                    {" "}
                    {L(b?.items).map((n, $i7) => { const $index = $i7; return (<React.Fragment key={$i7}>
                      {" "}
                      <a href="#news" style={{"display":"flex","flexDirection":"column","gap":"5px","padding":"14px 20px","borderBottom":"1px solid var(--color-divider)","textDecoration":"none","color":"inherit"}} className={cx(pc("hover", "background:var(--color-accent-100)"))}>
                        {" "}
                        <span style={{"fontSize":"11.5px","letterSpacing":".1em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                          {I(n?.date)}
                        </span>
                        {" "}
                        <span style={{"fontSize":"14.5px","lineHeight":"1.5"}}>
                          {I(n?.text)}
                        </span>
                        {" "}
                      </a>
                      {" "}
                    </React.Fragment>); })}
                    {" "}
                    {L(b?.items).map((n, $i8) => { const $index = $i8; return (<React.Fragment key={$i8}>
                      {" "}
                      <a href="#news" style={{"display":"flex","flexDirection":"column","gap":"5px","padding":"14px 20px","borderBottom":"1px solid var(--color-divider)","textDecoration":"none","color":"inherit"}} className={cx(pc("hover", "background:var(--color-accent-100)"))}>
                        {" "}
                        <span style={{"fontSize":"11.5px","letterSpacing":".1em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                          {I(n?.date)}
                        </span>
                        {" "}
                        <span style={{"fontSize":"14.5px","lineHeight":"1.5"}}>
                          {I(n?.text)}
                        </span>
                        {" "}
                      </a>
                      {" "}
                    </React.Fragment>); })}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <a href="#news" style={{"margin":"16px 20px 20px","borderRadius":"999px","whiteSpace":"nowrap","padding":"11px 22px","fontSize":"14px","justifyContent":"center","borderColor":"var(--color-divider)","color":"var(--color-accent-700)"}} className={cx("btn")}>
                  {"Read more"}
                </a>
                {" "}
              </article>
              {" "}
            </React.Fragment>); })}
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="news" style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)","display":"flex","flexDirection":"column","gap":"clamp(26px,4vw,44px)"}}>
        {" "}
        <div style={{"display":"flex","flexWrap":"wrap","gap":"18px","alignItems":"flex-end","justifyContent":"space-between"}}>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
              {"News & events"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.08"}}>
              {"Happening now"}
            </h2>
            {" "}
          </div>
          {" "}
          <a href="#news" style={{"fontSize":"15px","whiteSpace":"nowrap"}} className={cx("btn btn-ghost")}>
            {"All news →"}
          </a>
          {" "}
        </div>
        {" "}
        <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(280px,100%),1fr))","gap":"20px"}}>
          {" "}
          <article style={{"background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","overflow":"hidden","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column"}}>
            {" "}
            <div style={{"aspectRatio":"16/10","overflow":"hidden","background":"var(--color-surface)"}}>
              {" "}
              <div role="img" aria-label="Saraswati, goddess of learning" style={{"position":"relative","width":"100%","height":"100%","overflow":"hidden","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-marigold-soft)"}}>
                <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"150%","transform":"translate(-50%,-50%)","opacity":".1","pointerEvents":"none"}} />
                <img src="/assets/img-05-ae0620.png" alt="" style={{"position":"relative","height":"88%","width":"auto","mixBlendMode":"multiply","opacity":".85"}} />
              </div>
              {" "}
            </div>
            {" "}
            <div style={{"padding":"22px 24px","display":"flex","flexDirection":"column","gap":"8px"}}>
              {" "}
              <span style={{"fontSize":"12px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Placeholder · date"}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"19.5px","lineHeight":"1.2"}}>
                {"Vidyarambham for the new Nursery batch"}
              </h3>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","color":"var(--color-neutral-700)"}}>
                {"Parents are invited to the morning assembly."}
              </p>
              {" "}
            </div>
            {" "}
          </article>
          {" "}
          <article style={{"background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","overflow":"hidden","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column"}}>
            {" "}
            <div style={{"aspectRatio":"16/10","overflow":"hidden","background":"var(--color-surface)"}}>
              {" "}
              <img src="/images/learning-photo.webp" alt="Students reciting Sanskrit texts" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
              {" "}
            </div>
            {" "}
            <div style={{"padding":"22px 24px","display":"flex","flexDirection":"column","gap":"8px"}}>
              {" "}
              <span style={{"fontSize":"12px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Placeholder · date"}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"19.5px","lineHeight":"1.2"}}>
                {"Annual Sanskrit recitation evening"}
              </h3>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","color":"var(--color-neutral-700)"}}>
                {"Grades 4 to 10 present the term's memorised texts."}
              </p>
              {" "}
            </div>
            {" "}
          </article>
          {" "}
          <article style={{"background":"var(--color-accent-2-200)","borderRadius":"var(--radius-lg)","padding":"26px","display":"flex","flexDirection":"column","gap":"12px","justifyContent":"center"}}>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-accent-800)"}}>
              {"Calendar"}
            </span>
            {" "}
            <h3 style={{"margin":"0","fontSize":"22px","color":"var(--color-accent-900)"}}>
              {"Term dates and holidays"}
            </h3>
            {" "}
            <p style={{"margin":"0","fontSize":"15px","color":"var(--color-accent-900)"}}>
              {"The full year at a glance, with examination weeks marked."}
            </p>
            {" "}
            <button onClick={v.openCal} style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"11px 22px","fontSize":"14px","border":"0","cursor":"pointer","background":"var(--color-accent-900)","color":"var(--color-accent-2-100)","alignSelf":"flex-start"}} className={cx("btn", pc("hover", "background:var(--color-accent-800)"), pc("active", "background:var(--color-accent-700)"))}>
              {"Open calendar"}
            </button>
            {" "}
          </article>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="social" style={{"background":"var(--color-accent-2-100)","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"clamp(22px,3vw,34px)"}}>
          {" "}
          <div style={{"display":"flex","flexWrap":"wrap","gap":"18px","alignItems":"flex-end","justifyContent":"space-between"}}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"52ch"}}>
              {" "}
              <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Social media"}
              </span>
              {" "}
              <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.08","color":"var(--color-accent-900)"}}>
                {"The school day, as it happens"}
              </h2>
              {" "}
            </div>
            {" "}
            <div style={{"display":"flex","gap":"9px","flexWrap":"wrap"}}>
              {" "}
              <a href="#social" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"11px 20px","fontSize":"14px","background":"var(--color-accent-900)","color":"var(--color-accent-2-100)","borderColor":"var(--color-accent-900)"}} className={cx("btn")}>
                {"Follow on Facebook"}
              </a>
              {" "}
              <a href="#social" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"11px 20px","fontSize":"14px","borderColor":"var(--color-accent-900)","color":"var(--color-accent-900)"}} className={cx("btn")}>
                {"Subscribe on YouTube"}
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(320px,100%),1fr))","gap":"22px","alignItems":"start"}}>
            {" "}
            <div style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","overflow":"hidden","boxShadow":"var(--shadow-sm)"}}>
              {" "}
              <div style={{"display":"flex","alignItems":"center","gap":"12px","padding":"15px 20px","background":"var(--color-accent-900)"}}>
                {" "}
                <span style={{"width":"32px","height":"32px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.36c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.94 1.43-3.94 4.05v2.11H8v3h2.3V21h3.2Z"></path>
                  </svg>
                  {" "}
                </span>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"17px","color":"var(--color-accent-2-300)"}}>
                  {"From our page"}
                </span>
                {" "}
                <span style={{"marginLeft":"auto","fontSize":"11px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--color-accent-2-200)","opacity":".75"}}>
                  {"Latest posts"}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{"maxHeight":"430px","overflowY":"auto"}}>
                {" "}
                <article style={{"display":"flex","flexDirection":"column","gap":"12px","padding":"18px 20px","borderBottom":"1px solid var(--color-divider)"}}>
                  {" "}
                  <div style={{"display":"flex","alignItems":"center","gap":"11px"}}>
                    {" "}
                    <img src="/assets/img-03-55c76a.png" alt="" style={{"width":"34px","height":"34px","borderRadius":"999px","objectFit":"contain","background":"var(--color-accent-2-100)","padding":"3px","boxSizing":"border-box"}} />
                    {" "}
                    <span style={{"display":"flex","flexDirection":"column","gap":"1px","minWidth":"0"}}>
                      {" "}
                      <span style={{"fontSize":"14px","fontWeight":"600"}}>
                        {"Arundhati Gurukulam"}
                      </span>
                      {" "}
                      <span style={{"fontSize":"11.5px","color":"var(--color-neutral-600)"}}>
                        {"12 September"}
                      </span>
                      {" "}
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <p style={{"margin":"0","fontSize":"14.5px","lineHeight":"1.55","color":"var(--color-neutral-800)"}}>
                    {"Grades 4 to 10 recited the Rudram at the morning assembly to open the Sanskrit fortnight."}
                  </p>
                  {" "}
                  <div style={{"borderRadius":"var(--radius-md)","overflow":"hidden","aspectRatio":"16/9","background":"var(--color-surface)"}}>
                    {" "}
                    <img src="/images/life-1.webp" alt="Students at the morning assembly with folded hands" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
                    {" "}
                  </div>
                  {" "}
                </article>
                {" "}
                <article style={{"display":"flex","flexDirection":"column","gap":"12px","padding":"18px 20px","borderBottom":"1px solid var(--color-divider)"}}>
                  {" "}
                  <div style={{"display":"flex","alignItems":"center","gap":"11px"}}>
                    {" "}
                    <img src="/assets/img-03-55c76a.png" alt="" style={{"width":"34px","height":"34px","borderRadius":"999px","objectFit":"contain","background":"var(--color-accent-2-100)","padding":"3px","boxSizing":"border-box"}} />
                    {" "}
                    <span style={{"display":"flex","flexDirection":"column","gap":"1px","minWidth":"0"}}>
                      {" "}
                      <span style={{"fontSize":"14px","fontWeight":"600"}}>
                        {"Arundhati Gurukulam"}
                      </span>
                      {" "}
                      <span style={{"fontSize":"11.5px","color":"var(--color-neutral-600)"}}>
                        {"6 September"}
                      </span>
                      {" "}
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <p style={{"margin":"0","fontSize":"14.5px","lineHeight":"1.55","color":"var(--color-neutral-800)"}}>
                    {"Ganesha Chaturthi at the math — the children made their own clay murtis in the art room."}
                  </p>
                  {" "}
                  <div style={{"borderRadius":"var(--radius-md)","overflow":"hidden","aspectRatio":"16/9","background":"var(--color-surface)"}}>
                    {" "}
                    <div role="img" aria-label="Arundhati Gurukulam seal" style={{"position":"relative","width":"100%","height":"100%","overflow":"hidden","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-accent-900)"}}>
                      <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"150%","transform":"translate(-50%,-50%)","opacity":".1","pointerEvents":"none"}} />
                      <img src="/assets/img-06-f5e5bb.png" alt="" style={{"position":"relative","height":"52%","width":"auto"}} />
                    </div>
                    {" "}
                  </div>
                  {" "}
                </article>
                {" "}
                <article style={{"display":"flex","flexDirection":"column","gap":"12px","padding":"18px 20px","borderBottom":"1px solid var(--color-divider)"}}>
                  {" "}
                  <div style={{"display":"flex","alignItems":"center","gap":"11px"}}>
                    {" "}
                    <img src="/assets/img-03-55c76a.png" alt="" style={{"width":"34px","height":"34px","borderRadius":"999px","objectFit":"contain","background":"var(--color-accent-2-100)","padding":"3px","boxSizing":"border-box"}} />
                    {" "}
                    <span style={{"display":"flex","flexDirection":"column","gap":"1px","minWidth":"0"}}>
                      {" "}
                      <span style={{"fontSize":"14px","fontWeight":"600"}}>
                        {"Arundhati Gurukulam"}
                      </span>
                      {" "}
                      <span style={{"fontSize":"11.5px","color":"var(--color-neutral-600)"}}>
                        {"30 August"}
                      </span>
                      {" "}
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <p style={{"margin":"0","fontSize":"14.5px","lineHeight":"1.55","color":"var(--color-neutral-800)"}}>
                    {"Our Grade 8 students took the debate prize at the inter-school shastra sabha."}
                  </p>
                  {" "}
                  <div style={{"borderRadius":"var(--radius-md)","overflow":"hidden","aspectRatio":"16/9","background":"var(--color-surface)"}}>
                    {" "}
                    <div role="img" aria-label="Saraswati, goddess of learning" style={{"position":"relative","width":"100%","height":"100%","overflow":"hidden","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-marigold-soft)"}}>
                      <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"150%","transform":"translate(-50%,-50%)","opacity":".1","pointerEvents":"none"}} />
                      <img src="/assets/img-05-ae0620.png" alt="" style={{"position":"relative","height":"88%","width":"auto","mixBlendMode":"multiply","opacity":".85"}} />
                    </div>
                    {" "}
                  </div>
                  {" "}
                </article>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"14px"}}>
              {" "}
              <a href="#news" style={{"position":"relative","display":"block","borderRadius":"var(--radius-lg)","overflow":"hidden","boxShadow":"var(--shadow-md)","aspectRatio":"16/9","background":"var(--color-surface)","textDecoration":"none"}}>
                {" "}
                <img src="/images/life-3.webp" alt="Children playing veena and mridangam in the verandah" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
                {" "}
                <span style={{"position":"absolute","inset":"0","background":"linear-gradient(180deg,transparent 40%,color-mix(in srgb,var(--color-accent-900) 82%,transparent) 100%)","pointerEvents":"none"}}></span>
                {" "}
                <span style={{"position":"absolute","left":"50%","top":"50%","transform":"translate(-50%,-50%)","width":"66px","height":"66px","borderRadius":"999px","background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center","boxShadow":"var(--shadow-lg)"}}>
                  {" "}
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.2 19 12 8 18.8Z"></path>
                  </svg>
                  {" "}
                </span>
                {" "}
                <span style={{"position":"absolute","left":"22px","right":"22px","bottom":"18px","display":"flex","flexDirection":"column","gap":"5px"}}>
                  {" "}
                  <span style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(18px,1.7vw,23px)","lineHeight":"1.15","color":"var(--color-bg)"}}>
                    {"A year at Arundhati Gurukulam"}
                  </span>
                  {" "}
                  <span style={{"fontSize":"12.5px","letterSpacing":".1em","textTransform":"uppercase","color":"var(--color-accent-2-300)"}}>
                    {"Watch · 8:04"}
                  </span>
                  {" "}
                </span>
                {" "}
              </a>
              {" "}
              <a href="#news" style={{"display":"flex","gap":"14px","alignItems":"center","padding":"12px","borderRadius":"var(--radius-md)","textDecoration":"none","color":"inherit","background":"var(--color-neutral-100)"}} className={cx(pc("hover", "background:var(--color-accent-100)"))}>
                {" "}
                <span style={{"position":"relative","flex":"0 0 auto","width":"112px","aspectRatio":"16/9","borderRadius":"10px","overflow":"hidden","background":"var(--color-surface)"}}>
                  {" "}
                  <img src="/images/story-photo.webp" alt="Children reading together on the courtyard steps" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
                  {" "}
                </span>
                {" "}
                <span style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"4px"}}>
                  {" "}
                  <span style={{"fontSize":"14.5px","lineHeight":"1.35","fontWeight":"600"}}>
                    {"A morning at the gurukulam"}
                  </span>
                  {" "}
                  <span style={{"fontSize":"12px","letterSpacing":".1em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
                    {"4:12"}
                  </span>
                  {" "}
                </span>
                {" "}
              </a>
              {" "}
              <a href="#news" style={{"display":"flex","gap":"14px","alignItems":"center","padding":"12px","borderRadius":"var(--radius-md)","textDecoration":"none","color":"inherit","background":"var(--color-neutral-100)"}} className={cx(pc("hover", "background:var(--color-accent-100)"))}>
                {" "}
                <span style={{"position":"relative","flex":"0 0 auto","width":"112px","aspectRatio":"16/9","borderRadius":"10px","overflow":"hidden","background":"var(--color-surface)"}}>
                  {" "}
                  <div role="img" aria-label="Arundhati Gurukulam seal" style={{"position":"relative","width":"100%","height":"100%","overflow":"hidden","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--color-accent-900)"}}>
                    <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"150%","transform":"translate(-50%,-50%)","opacity":".1","pointerEvents":"none"}} />
                    <img src="/assets/img-06-f5e5bb.png" alt="" style={{"position":"relative","height":"56%","width":"auto"}} />
                  </div>
                  {" "}
                </span>
                {" "}
                <span style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"4px"}}>
                  {" "}
                  <span style={{"fontSize":"14.5px","lineHeight":"1.35","fontWeight":"600"}}>
                    {"Why we teach Sanskrit first"}
                  </span>
                  {" "}
                  <span style={{"fontSize":"12px","letterSpacing":".1em","textTransform":"uppercase","color":"var(--color-neutral-600)"}}>
                    {"6:38"}
                  </span>
                  {" "}
                </span>
                {" "}
              </a>
              {" "}
              <span style={{"fontSize":"13px","lineHeight":"1.55","color":"var(--color-neutral-700)"}}>
                {"Send the school's Facebook page and YouTube channel and these panels will pull the real feeds."}
              </span>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"position":"relative","overflow":"hidden","background":"var(--color-neutral-100)","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"clamp(26px,3vw,42px)"}}>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"11px","maxWidth":"56ch"}}>
            {" "}
            <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
              {"Why families choose us"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.04","letterSpacing":"-.015em"}}>
              {"What a child carries out of here"}
            </h2>
            {" "}
          </div>
          {" "}
          <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(250px,100%),1fr))","gap":"clamp(22px,2.6vw,38px)"}}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"11px"}}>
              {" "}
              <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"var(--color-accent-2-200)","color":"var(--color-accent-800)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 7v14"></path>
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                </svg>
                {" "}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"19.5px"}}>
                {"A trained memory"}
              </h3>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"Daily recitation builds a capacity for retention that carries into every other subject."}
              </p>
              {" "}
            </div>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"11px"}}>
              {" "}
              <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"var(--color-accent-2-200)","color":"var(--color-accent-800)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 8 6 6"></path>
                  <path d="m4 14 6-6 3-3"></path>
                  <path d="M2 5h12"></path>
                  <path d="M7 2h1"></path>
                  <path d="m22 22-5-10-5 10"></path>
                  <path d="M14 18h6"></path>
                </svg>
                {" "}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"19.5px"}}>
                {"Two languages of thought"}
              </h3>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"Sanskrit and English held together from Grade 1, so neither becomes the language a child only translates into."}
              </p>
              {" "}
            </div>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"11px"}}>
              {" "}
              <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"var(--color-accent-2-200)","color":"var(--color-accent-800)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                {" "}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"19.5px"}}>
                {"Conduct that shows"}
              </h3>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"Character is marked like any subject — in how a child speaks, listens and waits their turn."}
              </p>
              {" "}
            </div>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"11px"}}>
              {" "}
              <span style={{"width":"46px","height":"46px","borderRadius":"999px","background":"var(--color-accent-2-200)","color":"var(--color-accent-800)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {" "}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"19.5px"}}>
                {"Teachers who know them"}
              </h3>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"Small classes mean no child spends a year unnoticed at the back of a room."}
              </p>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="faq" style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(300px,100%),1fr))","gap":"clamp(28px,3.6vw,56px)","alignItems":"start"}}>
        {" "}
        <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"12px"}}>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Parents ask"}
          </span>
          {" "}
          <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.04","letterSpacing":"-.015em"}}>
            {"Arundhati Gurukulam, answered"}
          </h2>
          {" "}
          <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.622","color":"var(--color-neutral-800)","maxWidth":"42ch"}}>
            {"Straight answers to the questions families ask most. If yours isn't here, call the office and ask."}
          </p>
          {" "}
          <a href="/contact" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 26px","fontSize":"15px","alignSelf":"flex-start","marginTop":"6px"}} className={cx("btn btn-secondary")}>
            {"Talk to the office"}
          </a>
          {" "}
        </div>
        {" "}
        <div style={{"minWidth":"0","display":"flex","flexDirection":"column"}}>
          {" "}
          {L(v.faqs).map((faq, $i9) => { const $index = $i9; return (<React.Fragment key={$i9}>
            {" "}
            <div style={{"borderBottom":"1px solid var(--color-divider)"}}>
              {" "}
              <button onClick={faq?.toggle} style={{"width":"100%","background":"none","border":"0","padding":"18px 0","font":"inherit","fontSize":"16.5px","fontWeight":"600","color":"var(--color-text)","textAlign":"left","cursor":"pointer","display":"flex","gap":"16px","alignItems":"baseline","justifyContent":"space-between"}}>
                {" "}
                <span>
                  {I(faq?.q)}
                </span>
                {" "}
                <span style={{"flex":"0 0 auto","fontSize":"20px","lineHeight":"1","color":"var(--color-accent-700)"}}>
                  {I(faq?.sign)}
                </span>
                {" "}
              </button>
              {" "}
              {(faq?.open) ? (<>
                {" "}
                <p style={{"margin":"0","padding":"0 0 20px","fontSize":"15.5px","lineHeight":"1.65","color":"var(--color-neutral-700)","maxWidth":"56ch"}}>
                  {I(faq?.a)}
                </p>
                {" "}
              </>) : null}
              {" "}
            </div>
            {" "}
          </React.Fragment>); })}
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="admissions" style={{"position":"relative","overflow":"hidden","background":"var(--color-marigold-soft)","padding":"clamp(40px,4.4vw,68px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"min(900px,110%)","opacity":".10","animation":"agni-spin 300s linear infinite reverse","pointerEvents":"none"}} />
        {" "}
        <div style={{"position":"relative","maxWidth":"1200px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(320px,100%),1fr))","gap":"clamp(28px,4vw,56px)","alignItems":"center"}}>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"16px"}}>
            {" "}
            <span style={{"fontSize":"12px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-800)"}}>
              {"Admissions"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(26px,2.9vw,38px)","lineHeight":"1.06","color":"var(--color-accent-900)","textWrap":"pretty"}}>
              {"Come and see a morning for yourself"}
            </h2>
            {" "}
            <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.62","color":"var(--color-accent-900)","maxWidth":"52ch"}}>
              {"Visits are welcome on weekday mornings while classes are running. Leave your details and we will call to fix a time."}
            </p>
            {" "}
          </div>
          {" "}
          <form style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","display":"flex","flexDirection":"column","gap":"14px","boxShadow":"var(--shadow-lg)"}} onSubmit={v.visitSubmit}>
            {" "}
            <div className={cx("field")}>
              <label htmlFor="h-name">
                {"Parent's name"}
              </label>
              <input id="h-name" style={{"borderRadius":"999px"}} placeholder="Full name" className={cx("input")} />
            </div>
            {" "}
            <div className={cx("field")}>
              <label htmlFor="h-phone">
                {"Phone"}
              </label>
              <input id="h-phone" style={{"borderRadius":"999px"}} placeholder="+91" className={cx("input")} />
            </div>
            {" "}
            <div className={cx("field")}>
              <label htmlFor="h-grade">
                {"Grade applying for"}
              </label>
              <input id="h-grade" style={{"borderRadius":"999px"}} placeholder="e.g. Grade 3" className={cx("input")} />
            </div>
            {" "}
            <button style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 24px","fontSize":"15px"}} className={cx("btn btn-primary btn-block")}>
              {"Request a visit"}
            </button>
            {" "}
            <span style={{"fontSize":"12.5px","color":"var(--color-neutral-600)"}}>
              {"We reply within two working days."}
            </span>
            {" "}
          </form>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <footer id="contact" style={{"background":"var(--color-accent-900)","color":"var(--color-accent-2-200)","padding":"clamp(32px,3.2vw,46px) clamp(18px,3.4vw,52px) 24px"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"clamp(22px,2.6vw,34px)"}}>
          {" "}
          <div style={{"display":"flex","flexWrap":"wrap","gap":"clamp(26px,3vw,44px)","alignItems":"flex-start"}}>
            {" "}
            <div style={{"flex":"1 1 250px","minWidth":"0","display":"flex","flexDirection":"column","gap":"13px"}}>
              {" "}
              <img src="/assets/img-06-f5e5bb.png" alt="Arundhati Gurukulam" style={{"height":"84px","width":"auto","alignSelf":"flex-start"}} />
              {" "}
              <p style={{"margin":"0","fontSize":"14px","lineHeight":"1.6","opacity":".85","maxWidth":"32ch"}}>
                {"No.2, Raghavasadanam, Pampa Mahakavi Road, Uttaradi Math Compound, Shankarapuram, Basavanagudi, Bengaluru 560004"}
              </p>
              {" "}
              <a href="#admissions" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"11px 22px","fontSize":"13.5px","background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","alignSelf":"flex-start","marginTop":"2px"}} className={cx("btn")}>
                {"Begin an enquiry"}
              </a>
              {" "}
            </div>
            {" "}
            <div style={{"flex":"1 1 480px","minWidth":"0","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(104px,100%),1fr))","gap":"16px","alignItems":"start","overflowWrap":"anywhere"}}>
              {" "}
              <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"8px","fontSize":"13.5px"}}>
                {" "}
                <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
                  {"About us"}
                </span>
                {" "}
                <a href="#story" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Our Story"}
                </a>
                {" "}
                <a href="#pillars" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Vision, Mission & Values"}
                </a>
                {" "}
                <a href="#story" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Faculty"}
                </a>
                {" "}
                <a href="#admissions" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Careers"}
                </a>
                {" "}
              </div>
              {" "}
              <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"8px","fontSize":"13.5px"}}>
                {" "}
                <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
                  {"Academics"}
                </span>
                {" "}
                <a href="#learning" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Curriculum"}
                </a>
                {" "}
                <a href="#learning" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Sanskrit & Veda"}
                </a>
                {" "}
                <a href="#life" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Gurukulam Life"}
                </a>
                {" "}
                <a href="#life" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Photo Gallery"}
                </a>
                {" "}
              </div>
              {" "}
              <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"8px","fontSize":"13.5px"}}>
                {" "}
                <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
                  {"Admissions"}
                </span>
                {" "}
                <a href="#admissions" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Admissions 2027–28"}
                </a>
                {" "}
                <a href="#admissions" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Eligibility & Documents"}
                </a>
                {" "}
                <a href="#admissions" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Fee Structure"}
                </a>
                {" "}
                <a href="#admissions" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Schedule a Visit"}
                </a>
                {" "}
              </div>
              {" "}
              <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"8px","fontSize":"13.5px"}}>
                {" "}
                <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
                  {"Reach us"}
                </span>
                {" "}
                <a href="tel:+919686052212" style={{"color":"inherit","textDecoration":"none"}}>
                  {"+91 96860 52212"}
                </a>
                {" "}
                <a href="mailto:office@arundhatigurukulam.org" style={{"color":"inherit","textDecoration":"none"}}>
                  {"office@arundhatigurukulam.org"}
                </a>
                {" "}
                <a href="#news" style={{"color":"inherit","textDecoration":"none"}}>
                  {"News & Events"}
                </a>
                {" "}
                <a href="#faq" style={{"color":"inherit","textDecoration":"none"}}>
                  {"FAQ"}
                </a>
                {" "}
                <a href="/contact" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Contact"}
                </a>
                {" "}
                <a href="/login" style={{"color":"inherit","textDecoration":"none"}}>
                  {"Family Login"}
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{"borderTop":"1px solid color-mix(in srgb,var(--color-accent-2-200) 22%,transparent)","paddingTop":"22px","display":"flex","flexWrap":"wrap","gap":"16px","alignItems":"center","justifyContent":"space-between"}}>
            {" "}
            <span style={{"fontFamily":"var(--font-devanagari)","fontSize":"19px","color":"var(--color-accent-2-400)"}}>
              {"सहृदयम् अश्नवति"}
            </span>
            {" "}
            <span style={{"fontSize":"13px","opacity":".7"}}>
              {"© 2026 Arundhati Gurukulam, Bengaluru"}
            </span>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </footer>
    </div>
    </>
  );
}
