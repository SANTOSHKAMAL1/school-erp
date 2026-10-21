// Generated from "Admissions.dc.html" — markup kept 1:1 with the original design.
import React from 'react';
import { I, S, L, D, css, pc, cx } from '../../dc/runtime.js';

export default function template(v) {
  return (
    <>
    <div style={{"background":"var(--color-bg)","color":"var(--color-text)","fontFamily":"var(--font-body)"}}>
      {" "}
      <div style={{"background":"#1E120D","color":"var(--color-accent-2-200)"}}>
        {" "}
        <div style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"7px clamp(18px,3.4vw,52px)","display":"flex","gap":"8px 18px","alignItems":"center","flexWrap":"wrap","fontSize":"12.5px"}}>
          {" "}
          <a href="/" style={{"color":"inherit","textDecoration":"none","whiteSpace":"nowrap","flex":"0 0 auto"}}>
            {"← Home"}
          </a>
          {" "}
          <span style={{"display":"flex","gap":"6px","alignItems":"center"}}>
            {" "}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" style={{"opacity":".75"}}>
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M3.2 9h17.6"></path>
              <path d="M3.2 15h17.6"></path>
              <path d="M12 3a15 15 0 0 1 0 18"></path>
              <path d="M12 3a15 15 0 0 0 0 18"></path>
            </svg>
            {" "}
            <select aria-label="Choose a language" onChange={v.pickLang} value={D(v.langValue, "")} style={{"background":"#1E120D","border":"1px solid color-mix(in srgb,var(--color-accent-2-200) 30%,transparent)","borderRadius":"999px","font":"inherit","fontSize":"12.5px","fontWeight":"600","color":"var(--color-accent-2-200)","cursor":"pointer","padding":"4px 10px"}}>
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
          <span style={{"marginLeft":"auto","display":"flex","gap":"16px","alignItems":"center","flexWrap":"wrap"}}>
            {" "}
            <a href="tel:+919686052212" style={{"color":"inherit","textDecoration":"none"}}>
              {"+91 96860 52212"}
            </a>
            {" "}
            <a href="/login" style={{"color":"var(--color-accent-2-400)","textDecoration":"none","fontWeight":"600"}}>
              {"Family Login"}
            </a>
            {" "}
          </span>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
      <div style={{"background":"var(--color-bg)"}}>
        {" "}
        <div style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(12px,1.8vw,18px) clamp(18px,3.4vw,52px)","display":"flex","gap":"clamp(16px,3vw,32px)","alignItems":"center","flexWrap":"wrap"}}>
          {" "}
          <a href="/" style={{"display":"flex","alignItems":"center","gap":"14px","textDecoration":"none","color":"inherit"}}>
            {" "}
            <img src="/assets/img-03-55c76a.png" alt="Arundhati Gurukulam" style={{"height":"clamp(54px,9vw,74px)","width":"auto"}} />
            {" "}
            <span style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
              {" "}
              <span style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(18px,2vw,23px)","lineHeight":"1.05","color":"var(--color-accent-900)"}}>
                {"Arundhati Gurukulam"}
              </span>
              {" "}
              <span style={{"fontFamily":"var(--font-devanagari)","fontSize":"13.5px","color":"var(--color-accent-700)"}}>
                {"सुरक्षिता · सुशिक्षिता · सुशीला"}
              </span>
              {" "}
            </span>
            {" "}
          </a>
          {" "}
          <a href="#enquire" style={{"marginLeft":"auto","borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 26px","fontSize":"14.5px","background":"var(--color-accent)","color":"var(--color-accent-2-100)","borderColor":"var(--color-accent)"}} className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}>
            {"Enquire now"}
          </a>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
      <div style={{"position":"sticky","top":"0","zIndex":"60","background":"var(--color-accent)","borderTop":"1px solid color-mix(in srgb,var(--color-accent-900) 30%,transparent)"}}>
        {" "}
        <nav style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"0 clamp(18px,3.4vw,52px)","display":"flex","gap":"clamp(4px,1vw,14px)","alignItems":"stretch","fontSize":"14px","fontWeight":"600","flexWrap":"wrap"}}>
          {" "}
          <a href="/" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Home"}
          </a>
          {" "}
          <a href="/#story" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"About Us"}
          </a>
          {" "}
          <a href="/#learning" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Academics"}
          </a>
          {" "}
          <a href="/#life" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Gurukulam Life"}
          </a>
          {" "}
          <a href="/admissions" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center","background":"var(--color-accent-800)","boxShadow":"inset 0 -3px 0 var(--color-accent-2-500)"}}>
            {"Admissions"}
          </a>
          {" "}
          <a href="/#news" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Media"}
          </a>
          {" "}
          <a href="/contact" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Contact"}
          </a>
          {" "}
        </nav>
        {" "}
      </div>
      {" "}
      <section style={{"position":"relative","overflow":"hidden","background":"var(--color-accent-900)","color":"var(--color-bg)","padding":"clamp(40px,4.6vw,76px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","right":"-10%","top":"-40%","width":"min(700px,70%)","opacity":".12","animation":"agni-spin 300s linear infinite","pointerEvents":"none"}} />
        {" "}
        <div style={{"position":"relative","maxWidth":"1200px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(330px,100%),1fr))","gap":"clamp(26px,4vw,56px)","alignItems":"center"}}>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"18px","animation":"agni-rise .8s cubic-bezier(.22,1,.36,1) both"}}>
            {" "}
            <span style={{"background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","borderRadius":"999px","alignSelf":"flex-start","padding":"7px 16px","fontSize":"11.5px","fontWeight":"700","letterSpacing":".12em","textTransform":"uppercase"}}>
              {"Admissions 2027–28"}
            </span>
            {" "}
            <h1 style={{"margin":"0","fontSize":"clamp(30px,3.6vw,48px)","lineHeight":"1.03","letterSpacing":"-.015em","color":"var(--color-bg)"}}>
              {"Come and see a morning before you decide"}
            </h1>
            {" "}
            <p style={{"margin":"0","maxWidth":"52ch","fontSize":"clamp(15.5px,1.2vw,17px)","lineHeight":"1.6","color":"var(--color-accent-2-200)"}}>
              {"Applications are open for Nursery to Grade 10. Most families visit while classes are running, sit through a recitation period, and apply afterwards."}
            </p>
            {" "}
            <div style={{"display":"flex","gap":"12px","flexWrap":"wrap","marginTop":"4px"}}>
              {" "}
              <a href="#enquire" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"14px 28px","fontSize":"15px","background":"var(--color-accent-2-500)","color":"var(--color-accent-900)","borderColor":"var(--color-accent-2-500)","fontWeight":"600"}} className={cx("btn")}>
                {"Start an enquiry"}
              </a>
              {" "}
              <a href="#fees" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"14px 28px","fontSize":"15px","background":"transparent","borderColor":"var(--color-accent-2-200)","color":"var(--color-bg)"}} className={cx("btn")}>
                {"Fee structure"}
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <figure style={{"minWidth":"0","margin":"0","borderRadius":"var(--radius-lg)","overflow":"hidden","aspectRatio":"4/3","background":"var(--color-accent-800)"}} className={cx("washed")}>
            {" "}
            <img src="/images/hero-a.webp" alt="Students walking across the gurukulam courtyard in the morning" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","objectPosition":"70% 50%","display":"block"}} />
            {" "}
          </figure>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)","display":"flex","flexDirection":"column","gap":"clamp(24px,3vw,38px)"}}>
        {" "}
        <div style={{"display":"flex","flexDirection":"column","gap":"11px","maxWidth":"56ch"}}>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"How to apply"}
          </span>
          {" "}
          <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06"}}>
            {"Four steps, start to seat"}
          </h2>
          {" "}
        </div>
        {" "}
        <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(196px,100%),1fr))","gap":"20px"}}>
          {" "}
          {L(v.steps).map((s, $i10) => { const $index = $i10; return (<React.Fragment key={$i10}>
            {" "}
            <article style={{"minWidth":"0","borderTop":"3px solid var(--color-accent-2-500)","paddingTop":"20px","display":"flex","flexDirection":"column","gap":"9px"}}>
              {" "}
              <span style={{"fontFamily":"var(--font-heading)","fontSize":"32px","lineHeight":"1","color":"var(--color-accent-2-600)"}}>
                {I(s?.n)}
              </span>
              {" "}
              <h3 style={{"margin":"0","fontSize":"20px"}}>
                {I(s?.title)}
              </h3>
              {" "}
              <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {I(s?.body)}
              </p>
              {" "}
            </article>
            {" "}
          </React.Fragment>); })}
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"background":"var(--color-accent-2-100)","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(320px,100%),1fr))","gap":"clamp(26px,3.4vw,44px)","alignItems":"start"}}>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"18px"}}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
              {" "}
              <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Eligibility"}
              </span>
              {" "}
              <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06","color":"var(--color-accent-900)"}}>
                {"Age on 1 June 2027"}
              </h2>
              {" "}
            </div>
            {" "}
            <table style={{"width":"100%","borderCollapse":"collapse","fontSize":"15px"}} className={cx("table")}>
              {" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th style={{"textAlign":"left","padding":"12px 14px","fontSize":"12px","letterSpacing":".12em","textTransform":"uppercase"}}>
                    {"Class"}
                  </th>
                  {" "}
                  <th style={{"textAlign":"left","padding":"12px 14px","fontSize":"12px","letterSpacing":".12em","textTransform":"uppercase"}}>
                    {"Age"}
                  </th>
                  {" "}
                  <th style={{"textAlign":"left","padding":"12px 14px","fontSize":"12px","letterSpacing":".12em","textTransform":"uppercase"}}>
                    {"Seats"}
                  </th>
                  {" "}
                </tr>
                {" "}
              </thead>
              {" "}
              <tbody>
                {" "}
                {L(v.eligibility).map((e, $i11) => { const $index = $i11; return (<React.Fragment key={$i11}>
                  {" "}
                  <tr>
                    {" "}
                    <td style={{"padding":"12px 14px","borderTop":"1px solid var(--color-divider)"}}>
                      {I(e?.cls)}
                    </td>
                    {" "}
                    <td style={{"padding":"12px 14px","borderTop":"1px solid var(--color-divider)"}}>
                      {I(e?.age)}
                    </td>
                    {" "}
                    <td style={{"padding":"12px 14px","borderTop":"1px solid var(--color-divider)"}}>
                      {I(e?.seats)}
                    </td>
                    {" "}
                  </tr>
                  {" "}
                </React.Fragment>); })}
                {" "}
              </tbody>
              {" "}
            </table>
            {" "}
            <span style={{"fontSize":"13px","lineHeight":"1.6","color":"var(--color-neutral-700)"}}>
              {"Placeholder figures. The office will confirm the cut-off date and seat count for each class."}
            </span>
            {" "}
          </div>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"18px"}}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
              {" "}
              <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Documents"}
              </span>
              {" "}
              <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06","color":"var(--color-accent-900)"}}>
                {"What to bring"}
              </h2>
              {" "}
            </div>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"2px"}}>
              {" "}
              {L(v.documents).map((d, $i12) => { const $index = $i12; return (<React.Fragment key={$i12}>
                {" "}
                <span style={{"display":"flex","gap":"12px","alignItems":"flex-start","padding":"12px 0","borderBottom":"1px solid var(--color-divider)","fontSize":"15px","lineHeight":"1.55"}}>
                  {" "}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round" style={{"flex":"0 0 auto","marginTop":"2px"}}>
                    <path d="m4.5 12.5 4.5 4.5 10-10"></path>
                  </svg>
                  {"\n              "}{I(d?.text)}{"\n            "}
                </span>
                {" "}
              </React.Fragment>); })}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="fees" style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)","display":"flex","flexDirection":"column","gap":"clamp(24px,3vw,36px)"}}>
        {" "}
        <div style={{"display":"flex","flexWrap":"wrap","gap":"18px","alignItems":"flex-end","justifyContent":"space-between"}}>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"50ch"}}>
            {" "}
            <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
              {"Fees"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06"}}>
              {"Fee structure, 2027–28"}
            </h2>
            {" "}
          </div>
          {" "}
          <button onClick={v.toggleFees} style={{"fontSize":"15px","whiteSpace":"nowrap","cursor":"pointer"}} className={cx("btn btn-ghost")}>
            {I(v.feeToggleLabel)}
          </button>
          {" "}
        </div>
        {" "}
        <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(260px,100%),1fr))","gap":"20px"}}>
          {" "}
          {L(v.fees).map((f, $i13) => { const $index = $i13; return (<React.Fragment key={$i13}>
            {" "}
            <article style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(22px,2.6vw,30px)","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column","gap":"12px"}}>
              {" "}
              <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {I(f?.stage)}
              </span>
              {" "}
              <span style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(24px,2.1vw,30px)","lineHeight":"1","color":"var(--color-accent-900)"}}>
                {I(f?.amount)}
              </span>
              {" "}
              <span style={{"fontSize":"14.5px","lineHeight":"1.55","color":"var(--color-neutral-800)"}}>
                {I(f?.note)}
              </span>
              {" "}
            </article>
            {" "}
          </React.Fragment>); })}
          {" "}
        </div>
        {" "}
        {(v.feesOpen) ? (<>
          {" "}
          <div style={{"background":"var(--color-surface)","borderRadius":"var(--radius-lg)","padding":"clamp(20px,2.4vw,28px)","display":"flex","flexDirection":"column","gap":"14px"}}>
            {" "}
            <span style={{"fontFamily":"var(--font-heading)","fontSize":"19px"}}>
              {"What the fee covers"}
            </span>
            {" "}
            <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(240px,100%),1fr))","gap":"10px 24px"}}>
              {" "}
              {L(v.feeIncludes).map((i, $i14) => { const $index = $i14; return (<React.Fragment key={$i14}>
                {" "}
                <span style={{"fontSize":"14.5px","lineHeight":"1.55","padding":"8px 0","borderBottom":"1px solid var(--color-divider)"}}>
                  {I(i?.text)}
                </span>
                {" "}
              </React.Fragment>); })}
              {" "}
            </div>
            {" "}
            <span style={{"fontSize":"13px","lineHeight":"1.6","color":"var(--color-neutral-700)"}}>
              {"Transport, examination board charges and uniforms are billed separately. Figures are placeholders pending the school's fee circular."}
            </span>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
      </section>
      {" "}
      <section style={{"background":"var(--color-accent-900)","color":"var(--color-accent-2-200)","padding":"clamp(34px,3.8vw,58px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"clamp(20px,2.6vw,30px)"}}>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"50ch"}}>
            {" "}
            <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
              {"Key dates"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06","color":"var(--color-bg)"}}>
              {"The admission year at a glance"}
            </h2>
            {" "}
          </div>
          {" "}
          <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(210px,100%),1fr))","gap":"1px","background":"color-mix(in srgb,var(--color-accent-2-200) 22%,transparent)","borderRadius":"var(--radius-lg)","overflow":"hidden"}}>
            {" "}
            {L(v.dates).map((d, $i15) => { const $index = $i15; return (<React.Fragment key={$i15}>
              {" "}
              <div style={{"minWidth":"0","background":"var(--color-accent-900)","padding":"20px","display":"flex","flexDirection":"column","gap":"7px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"21px","color":"var(--color-accent-2-400)"}}>
                  {I(d?.when)}
                </span>
                {" "}
                <span style={{"fontSize":"14.5px","lineHeight":"1.5"}}>
                  {I(d?.what)}
                </span>
                {" "}
              </div>
              {" "}
            </React.Fragment>); })}
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="enquire" style={{"position":"relative","overflow":"hidden","background":"var(--color-marigold-soft)","padding":"clamp(38px,4.4vw,68px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"min(900px,110%)","opacity":".10","animation":"agni-spin 300s linear infinite reverse","pointerEvents":"none"}} />
        {" "}
        <div style={{"position":"relative","maxWidth":"1200px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(320px,100%),1fr))","gap":"clamp(26px,4vw,52px)","alignItems":"start"}}>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"16px"}}>
            {" "}
            <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-800)"}}>
              {"Enquiry"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06","color":"var(--color-accent-900)"}}>
              {"Leave your details and the office will call"}
            </h2>
            {" "}
            <p style={{"margin":"0","maxWidth":"46ch","fontSize":"15.5px","lineHeight":"1.62","color":"var(--color-accent-900)"}}>
              {"Or telephone +91 96860 52212 between 9 am and 4 pm on a weekday. Visits are welcome on weekday mornings while classes are running."}
            </p>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"8px","fontSize":"15px","color":"var(--color-accent-900)"}}>
              {" "}
              <span>
                {"No.2, Raghavasadanam, Pampa Mahakavi Road"}
              </span>
              {" "}
              <span>
                {"Uttaradi Math compound, Shankarapuram, Basavanagudi"}
              </span>
              {" "}
              <span>
                {"Bengaluru 560004"}
              </span>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {(v.sent) ? (<>
            {" "}
            <div style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","boxShadow":"var(--shadow-md)","display":"flex","flexDirection":"column","gap":"14px","alignItems":"flex-start"}}>
              {" "}
              <span style={{"width":"52px","height":"52px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center"}}>
                {" "}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m4.5 12.5 4.5 4.5 10-10"></path>
                </svg>
                {" "}
              </span>
              {" "}
              <span style={{"fontFamily":"var(--font-heading)","fontSize":"23px"}}>
                {"Thank you — we have your enquiry"}
              </span>
              {" "}
              <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"The office will telephone within two working days to arrange a morning visit."}
              </p>
              {" "}
              <button onClick={v.resetForm} style={{"fontSize":"15px","cursor":"pointer","whiteSpace":"nowrap"}} className={cx("btn btn-ghost")}>
                {"Send another enquiry"}
              </button>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {(v.notSent) ? (<>
            {" "}
            <form onSubmit={v.submit} style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","boxShadow":"var(--shadow-md)","display":"flex","flexDirection":"column","gap":"16px"}}>
              {" "}
              <label style={{"display":"flex","flexDirection":"column","gap":"7px"}}>
                {" "}
                <span style={{"fontSize":"13px","fontWeight":"600"}}>
                  {"Parent's name"}
                </span>
                {" "}
                <input type="text" required={true} style={{"borderRadius":"999px","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)"}} className={cx("input")} />
                {" "}
              </label>
              {" "}
              <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(160px,100%),1fr))","gap":"16px"}}>
                {" "}
                <label style={{"display":"flex","flexDirection":"column","gap":"7px","minWidth":"0"}}>
                  {" "}
                  <span style={{"fontSize":"13px","fontWeight":"600"}}>
                    {"Mobile"}
                  </span>
                  {" "}
                  <input type="tel" required={true} style={{"borderRadius":"999px","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)"}} className={cx("input")} />
                  {" "}
                </label>
                {" "}
                <label style={{"display":"flex","flexDirection":"column","gap":"7px","minWidth":"0"}}>
                  {" "}
                  <span style={{"fontSize":"13px","fontWeight":"600"}}>
                    {"Email"}
                  </span>
                  {" "}
                  <input type="email" style={{"borderRadius":"999px","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)"}} className={cx("input")} />
                  {" "}
                </label>
                {" "}
              </div>
              {" "}
              <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(160px,100%),1fr))","gap":"16px"}}>
                {" "}
                <label style={{"display":"flex","flexDirection":"column","gap":"7px","minWidth":"0"}}>
                  {" "}
                  <span style={{"fontSize":"13px","fontWeight":"600"}}>
                    {"Child's name"}
                  </span>
                  {" "}
                  <input type="text" style={{"borderRadius":"999px","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)"}} className={cx("input")} />
                  {" "}
                </label>
                {" "}
                <label style={{"display":"flex","flexDirection":"column","gap":"7px","minWidth":"0"}}>
                  {" "}
                  <span style={{"fontSize":"13px","fontWeight":"600"}}>
                    {"Class applying for"}
                  </span>
                  {" "}
                  <select style={{"borderRadius":"999px","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)","background":"var(--color-neutral-100)"}} className={cx("input")}>
                    {" "}
                    <option>
                      {"Nursery"}
                    </option>
                    {" "}
                    <option>
                      {"LKG"}
                    </option>
                    {" "}
                    <option>
                      {"UKG"}
                    </option>
                    {" "}
                    <option>
                      {"Grade 1 – 5"}
                    </option>
                    {" "}
                    <option>
                      {"Grade 6 – 8"}
                    </option>
                    {" "}
                    <option>
                      {"Grade 9 – 10"}
                    </option>
                    {" "}
                  </select>
                  {" "}
                </label>
                {" "}
              </div>
              {" "}
              <label style={{"display":"flex","flexDirection":"column","gap":"7px"}}>
                {" "}
                <span style={{"fontSize":"13px","fontWeight":"600"}}>
                  {"Anything you would like us to know"}
                </span>
                {" "}
                <textarea rows="3" style={{"borderRadius":"var(--radius-md)","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)","fontFamily":"inherit","resize":"vertical"}} className={cx("input")} />
                {" "}
              </label>
              {" "}
              <button type="submit" style={{"borderRadius":"999px","padding":"14px 28px","fontSize":"15px","fontWeight":"600","cursor":"pointer","justifyContent":"center","background":"var(--color-accent)","color":"var(--color-accent-2-100)","borderColor":"var(--color-accent)"}} className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}>
                {"Send enquiry"}
              </button>
              {" "}
              <span style={{"fontSize":"12.5px","lineHeight":"1.55","color":"var(--color-neutral-700)"}}>
                {"We use these details only to contact you about admission."}
              </span>
              {" "}
            </form>
            {" "}
          </>) : null}
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)","display":"flex","flexDirection":"column","gap":"clamp(20px,2.6vw,30px)"}}>
        {" "}
        <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"52ch"}}>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Parents ask"}
          </span>
          {" "}
          <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06"}}>
            {"Questions about admission"}
          </h2>
          {" "}
        </div>
        {" "}
        <div style={{"display":"flex","flexDirection":"column","gap":"0"}}>
          {" "}
          {L(v.faqs).map((f, $i16) => { const $index = $i16; return (<React.Fragment key={$i16}>
            {" "}
            <div style={{"borderBottom":"1px solid var(--color-divider)"}}>
              {" "}
              <button onClick={f?.toggle} style={{"width":"100%","background":"none","border":"0","padding":"19px 0","font":"inherit","textAlign":"left","cursor":"pointer","display":"flex","gap":"18px","alignItems":"baseline","color":"inherit"}}>
                {" "}
                <span style={{"flex":"1 1 auto","fontSize":"17px","fontWeight":"600","lineHeight":"1.4"}}>
                  {I(f?.q)}
                </span>
                {" "}
                <span style={{"flex":"0 0 auto","fontFamily":"var(--font-heading)","fontSize":"23px","color":"var(--color-accent)"}}>
                  {I(f?.sign)}
                </span>
                {" "}
              </button>
              {" "}
              {(f?.open) ? (<>
                {" "}
                <p style={{"margin":"0","padding":"0 0 20px","maxWidth":"70ch","fontSize":"15.5px","lineHeight":"1.62","color":"var(--color-neutral-800)"}}>
                  {I(f?.a)}
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
      <footer style={{"background":"#1E120D","color":"var(--color-accent-2-200)","padding":"clamp(34px,3.8vw,56px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"flex","flexWrap":"wrap","gap":"clamp(24px,4vw,56px)","justifyContent":"space-between","alignItems":"flex-start"}}>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"14px","maxWidth":"38ch"}}>
            {" "}
            <img src="/assets/img-06-f5e5bb.png" alt="Arundhati Gurukulam" style={{"height":"62px","width":"auto"}} />
            {" "}
            <span style={{"fontSize":"14.5px","lineHeight":"1.6"}}>
              {"No.2, Raghavasadanam, Pampa Mahakavi Road, Shankarapuram, Basavanagudi, Bengaluru 560004"}
            </span>
            {" "}
          </div>
          {" "}
          <div style={{"display":"flex","flexDirection":"column","gap":"11px","fontSize":"14.5px"}}>
            {" "}
            <span style={{"fontSize":"11.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
              {"Admissions"}
            </span>
            {" "}
            <a href="#enquire" style={{"color":"inherit","textDecoration":"none"}}>
              {"Enquiry form"}
            </a>
            {" "}
            <a href="#fees" style={{"color":"inherit","textDecoration":"none"}}>
              {"Fee structure"}
            </a>
            {" "}
            <a href="/login" style={{"color":"inherit","textDecoration":"none"}}>
              {"Family Login"}
            </a>
            {" "}
            <a href="/contact" style={{"color":"inherit","textDecoration":"none"}}>
              {"Contact"}
            </a>
            {" "}
            <a href="/" style={{"color":"inherit","textDecoration":"none"}}>
              {"Back to home"}
            </a>
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
