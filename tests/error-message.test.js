import { render } from 'dainte'

const clean = str => str.replace(/\>\s+?\</g, '><').trim()

test('error message', async () => {
    const { html } = await render('./tests/fixtures/errors.svelte')

    expect(clean(html)).toMatchInlineSnapshot(`
        "<div>Required</div><div class=\\"error\\">Required</div>
            Required
            <div class=\\"my-error\\" id=\\"my-error\\">Required</div><span>Required</span>"
    `)
})
