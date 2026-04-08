# @mohasinac/feat-forms

> **Layer 4** — Generic form shell components and styled input primitives, built on top of `react-hook-form` patterns. Domain-agnostic — suitable for any form in any feature.

## Install

```bash
npm install @mohasinac/feat-forms
```

Peer dependencies: React ≥ 18, Tailwind CSS ≥ 3.

---

## Form primitives

```tsx
import { Input, Textarea, Select, Checkbox, RadioGroup, Toggle, Slider } from "@mohasinac/feat-forms";
import { Form, FormGroup, FormFieldSpan, FormActions } from "@mohasinac/feat-forms";

<Form onSubmit={handleSubmit}>
  <FormGroup label="Email" required error={errors.email?.message}>
    <Input type="email" {...register("email")} error={!!errors.email} />
  </FormGroup>

  <FormGroup label="Category">
    <Select
      options={categories.map(c => ({ label: c.name, value: c.id }))}
      {...register("category")}
    />
  </FormGroup>

  <FormGroup label="Active">
    <Toggle {...register("isActive")} />
  </FormGroup>

  <FormActions>
    <Button type="submit">Save</Button>
  </FormActions>
</Form>
```

---

## Style constants

```ts
import { INPUT_BASE, INPUT_ERROR, INPUT_SUCCESS, INPUT_DISABLED, cn } from "@mohasinac/feat-forms";

// Compose consistent input styles
const className = cn(INPUT_BASE, hasError && INPUT_ERROR);
```

---

## Full export list

**Components:** `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Toggle`, `Slider`, `Form`, `FormGroup`, `FormFieldSpan`, `FormActions`

**Constants:** `cn`, `INPUT_BASE`, `INPUT_ERROR`, `INPUT_SUCCESS`, `INPUT_DISABLED`

**Types:** `InputProps`, `TextareaProps`, `SelectProps`, `SelectOption`, `CheckboxProps`, `RadioGroupProps`, `RadioOption`, `ToggleProps`, `SliderProps`, `FormProps`, `FormGroupProps`, `FormActionsProps`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
