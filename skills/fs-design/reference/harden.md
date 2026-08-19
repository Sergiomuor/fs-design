# /fs-design harden — production resilience

Make the surface survive reality: failed data, empty accounts, huge suppliers, slow networks, translated locales, keyboard-only users. The governing principle is **Engineered Responsiveness**: the shell stays usable no matter which component fails.

## The failure walk

For every data region, force the four answers:

1. **Loading** — a `Skeleton` mirroring the real content's shape and dimensions (no layout shift on arrival). Never a generic page spinner for a region.
2. **Empty** — states what "nothing here" means in domain terms and offers the next action (an empty engagement list explains *why* it might be empty and what creates one). `NotFound` for missing entities.
3. **Error** — contained at component level: this card degrades, the page shell and siblings keep working. The message names the problem and the recovery, calmly — no alarmism, no raw error dumps. Retry where retrying can work.
4. **Partial** — some fields null/unknown: unknown exposure renders the gray band (`base-gray-input`/`base-gray-disabled`), not a fabricated Low; missing metrics show an em-dash with a label, never 0 (a fake zero is a defensibility failure — it presents absence as fact).

## Edge cases with FS shapes

- **Long content:** supplier and entity names run long — truncate with tooltip (asChild), never overflow a table cell or wrap a KPI into two lines. Test with a 120-char name.
- **Big numbers:** currency in the billions through `formatCurrencyAbbreviated` where space is fixed; verify `data-xl` heroes don't overflow their DataBlock at worst-case width.
- **Many rows:** DataTable pagination present past ~50 rows; bulk actions stay reachable.
- **Form landmines:** same-slot conditional Buttons switching `type="button"` → `type="submit"` need distinct `key`s or the nav click implicitly submits. Validation onBlur (the system default); errors use the `input-error-*` halo and name the fix. `Dropzone` uses `validateFile` with explicit accept/size messaging. OTP flows via `FormOTP`.
- **i18n:** all user-visible strings through the i18n layer; MDX/prose contexts get **no** app providers — bring your own `NextIntlClientProvider` where components expect it. No string concatenation across message fragments; formatters handle dates/numbers/currency (`useCurrency()` live, `CurrencySnapshot` in reports).
- **Suspense:** an app-shell boundary awaiting backend data can hang hydration for the whole page — keep root layouts synchronous, push awaits into the component that needs the data.
- **Session reality:** auth-expiry mid-form and slow saves need optimistic-safe handling: disable the submit while pending (Button's loading state), never lose entered data on failure.

## Verify

Simulate each failure per region (mock the fetch, feed the long name, empty the list) — Storybook stories per state are the durable proof; add missing ones. Keyboard-walk the whole flow. Run `luz-lint --diff` (skip when the lint hook is on — it already told you). Report: regions hardened, states added (with story names), landmines fixed, anything needing backend support to harden further.
