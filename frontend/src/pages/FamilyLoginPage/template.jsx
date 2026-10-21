// Generated from "Family Login.dc.html" — markup kept 1:1 with the original design.
import React from 'react';
import { I, S, L, D, css, pc, cx } from '../../dc/runtime.js';

export default function template(v) {
  return (
    <>
    <div style={{"minHeight":"100vh","background":"var(--color-bg)","color":"var(--color-text)","fontFamily":"var(--font-body)"}}>
      {" "}
      {(v.atLogin) ? (<>
        {" "}
        <div style={{"minHeight":"100vh","display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(min(420px,100%),1fr))"}}>
          {" "}
          <div style={{"position":"relative","overflow":"hidden","background":"var(--color-accent-900)","color":"var(--color-accent-2-200)","padding":"clamp(34px,4vw,64px) clamp(24px,4vw,64px)","display":"flex","flexDirection":"column","justifyContent":"space-between","gap":"40px","minHeight":"320px"}}>
            {" "}
            <img src="/assets/img-01-961cb5.png" alt="" style={{"position":"absolute","left":"50%","top":"50%","width":"min(760px,150%)","opacity":".10","animation":"agni-spin 320s linear infinite","pointerEvents":"none"}} />
            {" "}
            <a href="/" style={{"position":"relative","display":"flex","alignItems":"center","gap":"14px","textDecoration":"none","color":"inherit"}}>
              {" "}
              <img src="/assets/img-06-f5e5bb.png" alt="Arundhati Gurukulam" style={{"height":"64px","width":"auto"}} />
              {" "}
              <span style={{"display":"flex","flexDirection":"column","gap":"3px"}}>
                {" "}
                <span style={{"fontFamily":"var(--font-heading)","fontSize":"21px","lineHeight":"1.1","color":"var(--color-bg)"}}>
                  {"Arundhati Gurukulam"}
                </span>
                {" "}
                <span style={{"fontSize":"11.5px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-2-400)"}}>
                  {I(v.portalWord)}
                </span>
                {" "}
              </span>
              {" "}
            </a>
            {" "}
            <div style={{"position":"relative","display":"flex","flexDirection":"column","gap":"18px","maxWidth":"34ch"}}>
              {" "}
              <span style={{"fontFamily":"var(--font-devanagari)","fontSize":"clamp(17px,1.7vw,22px)","lineHeight":"1.6","color":"var(--color-accent-2-300)"}}>
                {"सुरक्षिता · सुशिक्षिता · सुशीला"}
              </span>
              {" "}
              <h1 style={{"margin":"0","fontSize":"clamp(26px,2.7vw,38px)","lineHeight":"1.08","color":"var(--color-bg)"}}>
                {"Everything about your child's day, in one place"}
              </h1>
              {" "}
              <p style={{"margin":"0","fontSize":"15.5px","lineHeight":"1.62","color":"var(--color-accent-2-200)"}}>
                {"Attendance, circulars, fee receipts, the term calendar and the class teacher's notes — signed in, and always current."}
              </p>
              {" "}
            </div>
            {" "}
            <div style={{"position":"relative","display":"flex","flexWrap":"wrap","gap":"10px 26px","fontSize":"13.5px","color":"var(--color-accent-2-300)"}}>
              {" "}
              <span>
                {"+91 96860 52212"}
              </span>
              {" "}
              <span>
                {"office@arundhatigurukulam.in"}
              </span>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{"display":"flex","alignItems":"center","justifyContent":"center","padding":"clamp(32px,4vw,64px) clamp(22px,4vw,56px)"}}>
            {" "}
            <div style={{"width":"min(430px,100%)","display":"flex","flexDirection":"column","gap":"26px","animation":"agni-rise .7s cubic-bezier(.22,1,.36,1) both"}}>
              {" "}
              <div style={{"display":"flex","flexDirection":"column","gap":"9px"}}>
                {" "}
                <span style={{"fontSize":"11.5px","letterSpacing":".2em","textTransform":"uppercase","color":"var(--color-accent-700)"}}>
                  {"Sign in"}
                </span>
                {" "}
                <h2 style={{"margin":"0","fontSize":"clamp(25px,2.4vw,32px)","lineHeight":"1.06"}}>
                  {I(v.loginTitle)}
                </h2>
                {" "}
                <p style={{"margin":"0","fontSize":"15px","lineHeight":"1.6","color":"var(--color-neutral-700)"}}>
                  {I(v.loginSub)}
                </p>
                {" "}
              </div>
              {" "}
              <div style={{"background":"var(--color-marigold-soft)","borderRadius":"var(--radius-lg)","padding":"16px 18px","display":"flex","flexDirection":"column","gap":"11px"}}>
                <span style={{"fontSize":"11px","letterSpacing":".18em","textTransform":"uppercase","color":"var(--color-accent-800)"}}>
                  {"Signing in as"}
                </span>
                <div role="tablist" aria-label="Account type" style={{"display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","gap":"8px"}}>
                  {L(v.roles).map((r, $i) => (
                    <button key={r.id} type="button" role="tab" aria-selected={r.on} onClick={r.pick} style={css(`border-radius:999px;white-space:nowrap;padding:9px 16px;font-size:13.5px;cursor:pointer;border:1px solid ${S(r.border)};background:${S(r.bg)};color:${S(r.fg)}`)} className={cx("btn", pc("hover", "border-color:var(--color-accent-700)"))}>
                      {I(r.label)}
                    </button>
                  ))}
                </div>
              </div>
              {" "}
              <form onSubmit={v.signIn} style={{"display":"flex","flexDirection":"column","gap":"18px"}}>
                {" "}
                <label style={{"display":"flex","flexDirection":"column","gap":"8px"}}>
                  {" "}
                  <span style={{"fontSize":"13px","fontWeight":"600","letterSpacing":".02em"}}>
                    {I(v.idLabel)}
                  </span>
                  {" "}
                  <input type="text" value={D(v.idValue, "")} onChange={v.setId} placeholder={v.idPlaceholder} autoComplete="username" style={{"borderRadius":"999px","padding":"13px 20px","fontSize":"15px","background":"var(--color-neutral-100)","border":"1px solid var(--color-divider)"}} className={cx("input")} />
                  {" "}
                </label>
                {" "}
                <label style={{"display":"flex","flexDirection":"column","gap":"8px"}}>
                  {" "}
                  <span style={{"fontSize":"13px","fontWeight":"600","letterSpacing":".02em"}}>
                    {"Password"}
                  </span>
                  {" "}
                  <span style={{"position":"relative","display":"flex","alignItems":"center"}}>
                    {" "}
                    <input type={v.pwType} value={D(v.pwValue, "")} onChange={v.setPw} placeholder="••••••••" autoComplete="current-password" style={{"flex":"1 1 auto","borderRadius":"999px","padding":"13px 54px 13px 20px","fontSize":"15px","background":"var(--color-neutral-100)","border":"1px solid var(--color-divider)"}} className={cx("input")} />
                    {" "}
                    <button type="button" onClick={v.togglePw} style={{"position":"absolute","right":"8px","width":"38px","height":"38px","borderRadius":"999px","border":"0","background":"none","color":"var(--color-accent-700)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}} className={cx(pc("hover", "background:var(--color-accent-100)"))}>
                      {" "}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"></path>
                        <circle cx="12" cy="12" r="3.2"></circle>
                      </svg>
                      {" "}
                    </button>
                    {" "}
                  </span>
                  {" "}
                </label>
                {" "}
                <div style={{"display":"flex","flexWrap":"wrap","gap":"12px","alignItems":"center","justifyContent":"space-between"}}>
                  {" "}
                  <label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"14px","cursor":"pointer"}}>
                    {" "}
                    <input type="checkbox" checked={D(v.remember, false)} onChange={v.toggleRemember} style={{"width":"17px","height":"17px","accentColor":"var(--color-accent)"}} />
                    {"\n                Keep me signed in\n              "}
                  </label>
                  {" "}
                  <a href="#reset" onClick={v.toggleForgot} style={{"fontSize":"14px","textDecoration":"none","borderBottom":"1px solid var(--color-accent-300)"}}>
                    {"Forgot password?"}
                  </a>
                  {" "}
                </div>
                {" "}
                {(v.forgot) ? (
                  <div style={{"background":"var(--color-neutral-100)","border":"1px solid var(--color-divider)","borderRadius":"var(--radius-lg)","padding":"18px","display":"flex","flexDirection":"column","gap":"14px"}}>
                    <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
                      <span style={{"fontSize":"14px","fontWeight":"700","color":"var(--color-accent-900)"}}>
                        {"Reset Password via Email OTP"}
                      </span>
                      <button type="button" onClick={v.toggleForgot} style={{"background":"none","border":"none","fontSize":"13px","color":"var(--color-neutral-600)","cursor":"pointer","textDecoration":"underline"}}>
                        {"Close"}
                      </button>
                    </div>

                    {(v.otpError) ? (
                      <span style={{"background":"var(--color-accent-200)","color":"var(--color-accent-800)","borderRadius":"var(--radius-md)","padding":"10px 14px","fontSize":"13.5px","lineHeight":"1.4"}}>
                        {v.otpError}
                      </span>
                    ) : null}

                    {(v.otpSuccessMsg && v.otpStep !== 3) ? (
                      <span style={{"background":"#e6f4ea","color":"#137333","borderRadius":"var(--radius-md)","padding":"10px 14px","fontSize":"13.5px","lineHeight":"1.4"}}>
                        {v.otpSuccessMsg}
                      </span>
                    ) : null}

                    {(v.otpStep === 1) ? (
                      <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
                        <span style={{"fontSize":"13px","color":"var(--color-neutral-700)","lineHeight":"1.5"}}>
                          {"Enter your Login ID, Admission Number, or registered Email address to receive a secure 6-digit OTP code."}
                        </span>
                        <input
                          type="text"
                          value={v.otpLoginOrEmail}
                          onChange={v.setOtpLoginOrEmail}
                          placeholder="e.g. superadmin, name@example.com"
                          style={{"borderRadius":"999px","padding":"11px 18px","fontSize":"14px","background":"#ffffff","border":"1px solid var(--color-divider)"}}
                          className={cx("input")}
                        />
                        <button
                          type="button"
                          disabled={v.otpBusy}
                          onClick={v.requestOtp}
                          style={{"borderRadius":"999px","padding":"12px 20px","fontSize":"14px","fontWeight":"600","cursor":"pointer","background":"var(--color-accent)","color":"var(--color-accent-2-100)","border":"none"}}
                          className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}
                        >
                          {v.otpBusy ? "Sending OTP..." : "Send OTP to Email"}
                        </button>
                      </div>
                    ) : null}

                    {(v.otpStep === 2) ? (
                      <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
                        <span style={{"fontSize":"13px","color":"var(--color-neutral-700)","lineHeight":"1.5"}}>
                          {"Enter the 6-digit OTP sent to "}<strong>{v.otpMaskedEmail}</strong>{" and set your new password."}
                        </span>
                        <label style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                          <span style={{"fontSize":"12.5px","fontWeight":"600"}}>{"6-digit OTP Code"}</span>
                          <input
                            type="text"
                            maxLength="6"
                            value={v.otpCode}
                            onChange={v.setOtpCode}
                            placeholder="123456"
                            style={{"borderRadius":"999px","padding":"11px 18px","fontSize":"16px","letterSpacing":"3px","textAlign":"center","fontWeight":"700","background":"#ffffff","border":"1px solid var(--color-divider)"}}
                            className={cx("input")}
                          />
                        </label>
                        <label style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
                          <span style={{"fontSize":"12.5px","fontWeight":"600"}}>{"New Password (min 8 characters)"}</span>
                          <input
                            type="password"
                            value={v.otpNewPassword}
                            onChange={v.setOtpNewPassword}
                            placeholder="Enter new password"
                            style={{"borderRadius":"999px","padding":"11px 18px","fontSize":"14px","background":"#ffffff","border":"1px solid var(--color-divider)"}}
                            className={cx("input")}
                          />
                        </label>
                        <div style={{"display":"flex","gap":"10px","marginTop":"4px"}}>
                          <button
                            type="button"
                            disabled={v.otpBusy}
                            onClick={v.verifyOtpAndReset}
                            style={{"flex":"1 1 auto","borderRadius":"999px","padding":"12px 20px","fontSize":"14px","fontWeight":"600","cursor":"pointer","background":"var(--color-accent)","color":"var(--color-accent-2-100)","border":"none"}}
                            className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}
                          >
                            {v.otpBusy ? "Verifying..." : "Verify & Reset Password"}
                          </button>
                          <button
                            type="button"
                            onClick={v.resetToStep1}
                            style={{"borderRadius":"999px","padding":"12px 16px","fontSize":"13px","background":"none","border":"1px solid var(--color-divider)","cursor":"pointer"}}
                          >
                            {"Resend"}
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {(v.otpStep === 3) ? (
                      <div style={{"display":"flex","flexDirection":"column","gap":"12px","textAlign":"center","padding":"10px 0"}}>
                        <span style={{"background":"#e6f4ea","color":"#137333","borderRadius":"var(--radius-md)","padding":"12px 16px","fontSize":"14px","fontWeight":"600"}}>
                          {"✓ Password reset successfully!"}
                        </span>
                        <span style={{"fontSize":"13.5px","color":"var(--color-neutral-700)"}}>
                          {"You can now sign in with your updated credentials."}
                        </span>
                        <button
                          type="button"
                          onClick={v.toggleForgot}
                          style={{"borderRadius":"999px","padding":"12px 20px","fontSize":"14px","fontWeight":"600","cursor":"pointer","background":"var(--color-accent)","color":"var(--color-accent-2-100)","border":"none"}}
                          className={cx("btn")}
                        >
                          {"Proceed to Sign In"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {(v.hasError && !v.forgot) ? (<>
                  {" "}
                  <span style={{"background":"var(--color-accent-200)","color":"var(--color-accent-800)","borderRadius":"var(--radius-md)","padding":"12px 16px","fontSize":"14px","lineHeight":"1.5"}}>
                    {I(v.errorText)}
                  </span>
                  {" "}
                </>) : null}

                {" "}
                <button type="submit" disabled={v.busy} style={{"borderRadius":"999px","padding":"15px 28px","fontSize":"15.5px","fontWeight":"600","cursor":"pointer","justifyContent":"center","background":"var(--color-accent)","color":"var(--color-accent-2-100)","borderColor":"var(--color-accent)"}} className={cx("btn", pc("hover", "background:var(--color-accent-700)"))}>
                  {I(v.submitLabel)}
                </button>
                {" "}
              </form>
              {" "}
              <div style={{"display":"flex","flexDirection":"column","gap":"14px","paddingTop":"6px","borderTop":"1px solid var(--color-divider)"}}>
                {" "}
                <span style={{"fontSize":"14.5px","lineHeight":"1.6","color":"var(--color-neutral-700)"}}>
                  {"New family? "}
                  <a href="/#admissions" style={{"textDecoration":"none","borderBottom":"1px solid var(--color-accent-300)"}}>
                    {"Begin an admission enquiry"}
                  </a>
                </span>
                {" "}
                <a href="/" style={{"fontSize":"14px","textDecoration":"none","color":"var(--color-neutral-700)"}} className={cx(pc("hover", "color:var(--color-accent)"))}>
                  {"← Back to the website"}
                </a>
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
    </div>
    </>
  );
}
