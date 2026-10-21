// Generated from "Contact.dc.html" — markup kept 1:1 with the original design.
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
          <a href="#visit" style={{"marginLeft":"auto","borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 26px","fontSize":"14.5px","background":"var(--color-accent)","color":"var(--color-accent-2-100)","borderColor":"var(--color-accent)"}} className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}>
            {"Request a visit"}
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
          <a href="/admissions" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Admissions"}
          </a>
          {" "}
          <a href="/#news" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center"}} className={cx(pc("hover", "background:var(--color-accent-800)"))}>
            {"Media"}
          </a>
          {" "}
          <a href="/contact" style={{"color":"var(--color-accent-2-100)","textDecoration":"none","padding":"14px 12px","display":"flex","alignItems":"center","background":"var(--color-accent-800)","boxShadow":"inset 0 -3px 0 var(--color-accent-2-500)"}}>
            {"Contact"}
          </a>
          {" "}
        </nav>
        {" "}
      </div>
      {" "}
      <section style={{"position":"relative","overflow":"hidden","background":"var(--color-marigold-soft)","padding":"clamp(34px,4vw,62px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"min(900px,110%)","opacity":".10","animation":"agni-spin 300s linear infinite","pointerEvents":"none"}} />
        {" "}
        <div style={{"position":"relative","maxWidth":"1200px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"16px","animation":"agni-rise .8s cubic-bezier(.22,1,.36,1) both"}}>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-800)"}}>
            {"Contact"}
          </span>
          {" "}
          <h1 style={{"margin":"0","fontSize":"clamp(30px,3.6vw,46px)","lineHeight":"1.03","letterSpacing":"-.015em","color":"var(--color-accent-900)","maxWidth":"26ch"}}>
            {"The office answers between 9 am and 4 pm"}
          </h1>
          {" "}
          <p style={{"margin":"0","maxWidth":"56ch","fontSize":"clamp(15.5px,1.2vw,17px)","lineHeight":"1.6","color":"var(--color-accent-900)"}}>
            {"Telephone for anything urgent, write for anything that can wait a day, and come in person on a weekday morning if you would like to see the school at work."}
          </p>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(34px,4vw,58px) clamp(18px,3.4vw,52px)","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(258px,100%),1fr))","gap":"20px"}}>
        {" "}
        <article style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(20px,2.4vw,26px)","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column","gap":"12px"}}>
          {" "}
          <span style={{"width":"44px","height":"44px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center","flex":"0 0 auto"}}>
            {" "}
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="2.8"></circle>
            </svg>
            {" "}
          </span>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Address"}
          </span>
          {" "}
          <span style={{"fontSize":"15.5px","lineHeight":"1.6","overflowWrap":"anywhere"}}>
            {"No.2, Raghavasadanam"}
            <br />
            {"Pampa Mahakavi Road"}
            <br />
            {"Shankarapuram, Basavanagudi"}
            <br />
            {"Bengaluru 560004"}
          </span>
          {" "}
          <a href="#map" style={{"marginTop":"auto","fontSize":"14px","textDecoration":"none","borderBottom":"1px solid var(--color-accent-300)","alignSelf":"flex-start"}}>
            {"Open directions"}
          </a>
          {" "}
        </article>
        {" "}
        <article style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(20px,2.4vw,26px)","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column","gap":"12px"}}>
          {" "}
          <span style={{"width":"44px","height":"44px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center","flex":"0 0 auto"}}>
            {" "}
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3Z"></path>
            </svg>
            {" "}
          </span>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Telephone"}
          </span>
          {" "}
          <span style={{"fontSize":"15.5px","lineHeight":"1.6","overflowWrap":"anywhere"}}>
            {"+91 96860 52212"}
          </span>
          {" "}
          <a href="tel:+919686052212" style={{"marginTop":"auto","fontSize":"14px","textDecoration":"none","borderBottom":"1px solid var(--color-accent-300)","alignSelf":"flex-start"}}>
            {"Call the office"}
          </a>
          {" "}
        </article>
        {" "}
        <article style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(20px,2.4vw,26px)","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column","gap":"12px"}}>
          {" "}
          <span style={{"width":"44px","height":"44px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center","flex":"0 0 auto"}}>
            {" "}
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="3"></rect>
              <path d="m3.8 7 8.2 6 8.2-6"></path>
            </svg>
            {" "}
          </span>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Email"}
          </span>
          {" "}
          <span style={{"fontSize":"15.5px","lineHeight":"1.6","overflowWrap":"anywhere"}}>
            {"office@arundhatigurukulam.in"}
            <br />
            {"admissions@arundhatigurukulam.in"}
          </span>
          {" "}
          <a href="mailto:office@arundhatigurukulam.in" style={{"marginTop":"auto","fontSize":"14px","textDecoration":"none","borderBottom":"1px solid var(--color-accent-300)","alignSelf":"flex-start"}}>
            {"Write to us"}
          </a>
          {" "}
        </article>
        {" "}
        <article style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","padding":"clamp(20px,2.4vw,26px)","boxShadow":"var(--shadow-sm)","display":"flex","flexDirection":"column","gap":"12px"}}>
          {" "}
          <span style={{"width":"44px","height":"44px","borderRadius":"999px","background":"var(--color-accent-2-300)","color":"var(--color-accent-900)","display":"flex","alignItems":"center","justifyContent":"center","flex":"0 0 auto"}}>
            {" "}
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 7.5V12l3.5 2"></path>
            </svg>
            {" "}
          </span>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Office hours"}
          </span>
          {" "}
          <span style={{"fontSize":"15.5px","lineHeight":"1.6","overflowWrap":"anywhere"}}>
            {"Monday to Friday, 9 am – 4 pm"}
            <br />
            {"Saturday, 9 am – 12 noon"}
            <br />
            {"Closed on Sundays and holidays"}
          </span>
          {" "}
          <a href="/#notices" style={{"marginTop":"auto","fontSize":"14px","textDecoration":"none","borderBottom":"1px solid var(--color-accent-300)","alignSelf":"flex-start"}}>
            {"See the term calendar"}
          </a>
          {" "}
        </article>
        {" "}
      </section>
      {" "}
      <section style={{"background":"var(--color-surface)","padding":"clamp(34px,4vw,58px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(320px,100%),1fr))","gap":"clamp(24px,3.4vw,44px)","alignItems":"start"}}>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"18px"}}>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
              {" "}
              <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Finding us"}
              </span>
              {" "}
              <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06"}}>
                {"In the math compound at Shankarapuram"}
              </h2>
              {" "}
            </div>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"2px"}}>
              {" "}
              {L(v.directions).map((d, $i17) => { const $index = $i17; return (<React.Fragment key={$i17}>
                {" "}
                <div style={{"display":"flex","gap":"14px","alignItems":"baseline","padding":"12px 0","borderBottom":"1px solid var(--color-divider)"}}>
                  {" "}
                  <span style={{"flex":"0 0 116px","fontSize":"12.5px","letterSpacing":".08em","textTransform":"uppercase","color":"var(--color-accent-700)","fontWeight":"600"}}>
                    {I(d?.mode)}
                  </span>
                  {" "}
                  <span style={{"minWidth":"0","fontSize":"15px","lineHeight":"1.55"}}>
                    {I(d?.note)}
                  </span>
                  {" "}
                </div>
                {" "}
              </React.Fragment>); })}
              {" "}
            </div>
            {" "}
            <a href="#map" style={{"borderRadius":"999px","whiteSpace":"nowrap","padding":"13px 26px","fontSize":"14.5px","alignSelf":"flex-start","background":"var(--color-accent)","color":"var(--color-accent-2-100)","borderColor":"var(--color-accent)"}} className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}>
              {"Open directions"}
            </a>
            {" "}
            <span style={{"fontSize":"13px","lineHeight":"1.6","color":"var(--color-neutral-700)"}}>
              {"Landmark and transit notes are placeholders — send the school's preferred wording and the map pin and I will set both exactly."}
            </span>
            {" "}
          </div>
          {" "}
          <figure id="map" style={{"minWidth":"0","margin":"0","borderRadius":"var(--radius-lg)","overflow":"hidden","aspectRatio":"4/3","background":"var(--color-neutral-200)","boxShadow":"var(--shadow-md)"}} className={cx("washed")}>
            {" "}
            <image-slot id="contact-map" shape="rect" placeholder="Map or street photograph of the entrance"></image-slot>
            {" "}
          </figure>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section style={{"maxWidth":"calc(1200px + 2*clamp(18px,3.4vw,52px))","margin":"0 auto","padding":"clamp(34px,4vw,58px) clamp(18px,3.4vw,52px)","display":"flex","flexDirection":"column","gap":"clamp(22px,2.6vw,32px)"}}>
        {" "}
        <div style={{"display":"flex","flexDirection":"column","gap":"10px","maxWidth":"52ch"}}>
          {" "}
          <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
            {"Who to ask"}
          </span>
          {" "}
          <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06"}}>
            {"Straight to the right desk"}
          </h2>
          {" "}
        </div>
        {" "}
        <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(194px,100%),1fr))","gap":"18px"}}>
          {" "}
          {L(v.desks).map((d, $i18) => { const $index = $i18; return (<React.Fragment key={$i18}>
            {" "}
            <div style={{"minWidth":"0","background":"var(--color-neutral-100)","borderRadius":"var(--radius-lg)","boxShadow":"var(--shadow-sm)","padding":"22px","display":"flex","flexDirection":"column","gap":"8px"}}>
              {" "}
              <span style={{"fontFamily":"var(--font-heading)","fontSize":"18px"}}>
                {I(d?.name)}
              </span>
              {" "}
              <span style={{"fontSize":"14.5px","lineHeight":"1.55","color":"var(--color-neutral-800)"}}>
                {I(d?.scope)}
              </span>
              {" "}
              <span style={{"fontSize":"14px","color":"var(--color-accent-700)","fontWeight":"600","overflowWrap":"anywhere"}}>
                {I(d?.reach)}
              </span>
              {" "}
            </div>
            {" "}
          </React.Fragment>); })}
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section id="visit" style={{"background":"var(--color-accent-900)","color":"var(--color-accent-2-200)","padding":"clamp(36px,4.2vw,66px) clamp(18px,3.4vw,52px)"}}>
        {" "}
        <div style={{"maxWidth":"1200px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(320px,100%),1fr))","gap":"clamp(26px,4vw,52px)","alignItems":"start"}}>
          {" "}
          <div style={{"minWidth":"0","display":"flex","flexDirection":"column","gap":"16px"}}>
            {" "}
            <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-2-500)"}}>
              {"Request a visit"}
            </span>
            {" "}
            <h2 style={{"margin":"0","fontSize":"clamp(23px,2.2vw,31px)","lineHeight":"1.06","color":"var(--color-bg)"}}>
              {"See a morning while classes are running"}
            </h2>
            {" "}
            <p style={{"margin":"0","maxWidth":"46ch","fontSize":"15.5px","lineHeight":"1.62"}}>
              {"Choose a weekday that suits you. The office will confirm by telephone and tell you which period to arrive for."}
            </p>
            {" "}
            <div style={{"display":"flex","flexDirection":"column","gap":"9px","paddingTop":"6px","fontSize":"14.5px"}}>
              {" "}
              {L(v.hours).map((h, $i19) => { const $index = $i19; return (<React.Fragment key={$i19}>
                {" "}
                <span style={{"display":"flex","gap":"14px","alignItems":"baseline","paddingBottom":"9px","borderBottom":"1px solid color-mix(in srgb,var(--color-accent-2-200) 22%,transparent)"}}>
                  {" "}
                  <span style={{"flex":"0 0 132px","color":"var(--color-accent-2-400)","fontWeight":"600"}}>
                    {I(h?.when)}
                  </span>
                  {" "}
                  <span style={{"minWidth":"0"}}>
                    {I(h?.what)}
                  </span>
                  {" "}
                </span>
                {" "}
              </React.Fragment>); })}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {(v.sent) ? (<>
            {" "}
            <div style={{"minWidth":"0","background":"var(--color-neutral-100)","color":"var(--color-text)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","boxShadow":"var(--shadow-md)","display":"flex","flexDirection":"column","gap":"14px","alignItems":"flex-start"}}>
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
                {"Request received"}
              </span>
              {" "}
              <span style={{"fontSize":"13px","letterSpacing":".1em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                {"Reference "}{I(v.ref)}
              </span>
              {" "}
              <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.6","color":"var(--color-neutral-800)"}}>
                {"The office will telephone within two working days to fix the morning. Keep the reference for any follow-up call."}
              </p>
              {" "}
              <button onClick={v.reset} style={{"fontSize":"15px","cursor":"pointer","whiteSpace":"nowrap"}} className={cx("btn btn-ghost")}>
                {"Send another request"}
              </button>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {(v.notSent) ? (<>
            {" "}
            <form onSubmit={v.submit} style={{"minWidth":"0","background":"var(--color-neutral-100)","color":"var(--color-text)","borderRadius":"var(--radius-lg)","padding":"clamp(24px,3vw,34px)","boxShadow":"var(--shadow-md)","display":"flex","flexDirection":"column","gap":"16px"}}>
              {" "}
              <label style={{"display":"flex","flexDirection":"column","gap":"7px"}}>
                {" "}
                <span style={{"fontSize":"13px","fontWeight":"600"}}>
                  {"Your name"}
                </span>
                {" "}
                <input type="text" value={D(v.nameValue, "")} onChange={v.setName} onBlur={v.touchName} style={css(`border-radius:999px;padding:12px 18px;font-size:15px;border:1px solid ${S(v.nameBorder)}`)} className={cx("input")} />
                {" "}
                {(v.nameBad) ? (<>
                  {" "}
                  <span style={{"fontSize":"13px","color":"var(--color-accent-700)"}}>
                    {"Please tell us your name."}
                  </span>
                  {" "}
                </>) : null}
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
                  <input type="tel" value={D(v.phoneValue, "")} onChange={v.setPhone} onBlur={v.touchPhone} placeholder="10 digits" style={css(`border-radius:999px;padding:12px 18px;font-size:15px;border:1px solid ${S(v.phoneBorder)}`)} className={cx("input")} />
                  {" "}
                  {(v.phoneBad) ? (<>
                    {" "}
                    <span style={{"fontSize":"13px","color":"var(--color-accent-700)"}}>
                      {"Enter a ten-digit mobile number."}
                    </span>
                    {" "}
                  </>) : null}
                  {" "}
                </label>
                {" "}
                <label style={{"display":"flex","flexDirection":"column","gap":"7px","minWidth":"0"}}>
                  {" "}
                  <span style={{"fontSize":"13px","fontWeight":"600"}}>
                    {"Preferred day"}
                  </span>
                  {" "}
                  <select style={{"borderRadius":"999px","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)","background":"var(--color-neutral-100)"}} className={cx("input")}>
                    {" "}
                    <option>
                      {"Monday"}
                    </option>
                    {" "}
                    <option>
                      {"Tuesday"}
                    </option>
                    {" "}
                    <option>
                      {"Wednesday"}
                    </option>
                    {" "}
                    <option>
                      {"Thursday"}
                    </option>
                    {" "}
                    <option>
                      {"Friday"}
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
                <span style={{"display":"flex","gap":"10px","alignItems":"baseline","fontSize":"13px","fontWeight":"600"}}>
                  {"What would you like to see or ask? "}
                  <span style={css(`margin-left:auto;font-weight:400;color:${S(v.countColor)}`)}>
                    {I(v.countLabel)}
                  </span>
                </span>
                {" "}
                <textarea rows="3" value={D(v.noteValue, "")} onChange={v.setNote} style={{"borderRadius":"var(--radius-md)","padding":"12px 18px","fontSize":"15px","border":"1px solid var(--color-divider)","fontFamily":"inherit","resize":"vertical"}} className={cx("input")} />
                {" "}
              </label>
              {" "}
              {(v.showSummary) ? (<>
                {" "}
                <span style={{"background":"var(--color-accent-200)","color":"var(--color-accent-800)","borderRadius":"var(--radius-md)","padding":"12px 16px","fontSize":"14px","lineHeight":"1.5"}}>
                  {"Check the highlighted fields and send again."}
                </span>
                {" "}
              </>) : null}
              {" "}
              <button type="submit" style={{"borderRadius":"999px","padding":"14px 28px","fontSize":"15px","fontWeight":"600","cursor":"pointer","justifyContent":"center","whiteSpace":"nowrap","background":"var(--color-accent)","color":"var(--color-accent-2-100)","borderColor":"var(--color-accent)"}} className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}>
                {"Send request"}
              </button>
              {" "}
              <span style={{"fontSize":"12.5px","lineHeight":"1.55","color":"var(--color-neutral-700)"}}>
                {"We use these details only to arrange your visit."}
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
              {"Elsewhere"}
            </span>
            {" "}
            <a href="/" style={{"color":"inherit","textDecoration":"none"}}>
              {"Home"}
            </a>
            {" "}
            <a href="/admissions" style={{"color":"inherit","textDecoration":"none"}}>
              {"Admissions"}
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
      </footer>
    </div>
    </>
  );
}
