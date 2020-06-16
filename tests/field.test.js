import { render } from 'dainte'

const clean = str => str.replace(/\>\s+?\</g, '><').trim()

test('select', async () => {
    const { html } = await render('./tests/fixtures/select.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<select name=\\"color\\" value=\\"undefined\\"><option value=\\"red\\">Red</option><option value=\\"green\\">Green</option><option value=\\"blue\\">Blue</option></select>"`,
    )
})

test('select multiple', async () => {
    const { html } = await render('./tests/fixtures/select-multiple.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<select name=\\"color\\" value=\\"undefined\\" multiple><option value=\\"red\\">Red</option><option value=\\"green\\">Green</option><option value=\\"blue\\">Blue</option></select>"`,
    )
})

test('textarea', async () => {
    const { html } = await render('./tests/fixtures/textarea.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<textarea name=\\"color\\">undefined</textarea>"`,
    )
})

test('checkbox', async () => {
    const { html } = await render('./tests/fixtures/checkbox.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input name=\\"color\\" type=\\"checkbox\\">"`,
    )
})

test('checkbox with rest', async () => {
    const { html } = await render('./tests/fixtures/checkbox-rest.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input name=\\"color\\" type=\\"checkbox\\" class=\\"purple\\">"`,
    )
})

test('input', async () => {
    const { html } = await render('./tests/fixtures/as-input.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input name=\\"color\\" type=\\"text\\" value=\\"undefined\\">"`,
    )
})

test('input number', async () => {
    const { html } = await render('./tests/fixtures/as-input-number.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input name=\\"color\\" type=\\"number\\" value=\\"undefined\\">"`,
    )
})

test('input slot', async () => {
    const { html } = await render('./tests/fixtures/input-slot.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input type=\\"text\\" name=\\"color\\">"`,
    )
})

test('input let:props', async () => {
    const { html } = await render('./tests/fixtures/input-let-props.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input type=\\"text\\" name=\\"color\\">"`,
    )
})

test('input component', async () => {
    const { html } = await render('./tests/fixtures/as-component.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input type=\\"text\\" name=\\"color\\" placeholder=\\"Blue\\">"`,
    )
})
