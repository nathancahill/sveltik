# Sveltik

Forms in Svelte, inspired by Formik.

```html
<Form
    initialValues={{
        email: '',
        password: '',
    }}
    validate
    on:submit={handleSubmit}
>
    <Field name="input" let:change let:blur let:fieldName let:value>
        <input name={fieldName} {value} on:input={change} on:blur={blur} type="number" />
    </Field>
</Form>
```
