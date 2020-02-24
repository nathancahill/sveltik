import { render } from 'dainte'

const clean = str => str.replace(/\>\s+?\</g, '><').trim()

test('select', async () => {
    const { html } = await render('./tests/fixtures/select.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<select name=\\"color\\" as=\\"select\\" value=\\"undefined\\"><option value=\\"red\\">Red</option><option value=\\"green\\">Green</option><option value=\\"blue\\">Blue</option></select>"`,
    )
})

test('select multiple', async () => {
    const { html } = await render('./tests/fixtures/select-multiple.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<select name=\\"color\\" multiple><option value=\\"red\\">Red</option><option value=\\"green\\">Green</option><option value=\\"blue\\">Blue</option></select>"`,
    )
})

test('textarea', async () => {
    const { html } = await render('./tests/fixtures/textarea.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<textarea name=\\"color\\" as=\\"textarea\\">undefined</textarea>"`,
    )
})

test('checkbox', async () => {
    const { html } = await render('./tests/fixtures/checkbox.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input name=\\"color\\" type=\\"checkbox\\" >"`,
    )
})

test('input', async () => {
    const { html } = await render('./tests/fixtures/as-input.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input name=\\"color\\" as=\\"input\\" value=\\"undefined\\">"`,
    )
})

test('input number', async () => {
    const { html } = await render('./tests/fixtures/as-input-number.svelte')

    expect(clean(html)).toMatchInlineSnapshot(
        `"<input name=\\"color\\" as=\\"input\\" type=\\"number\\" value=\\"undefined\\">"`,
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
