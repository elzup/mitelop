// staged ファイルに prettier + eslint を実行する。
// eslint は lint script と同様に stories / __tests__ を除外する。
module.exports = {
  '*.{ts,tsx}': (files) => {
    const lintable = files.filter(
      (f) => !f.endsWith('.stories.tsx') && !f.includes('__tests__')
    )
    const cmds = [`prettier --write ${files.join(' ')}`]

    if (lintable.length > 0) {
      cmds.push(`eslint --fix ${lintable.join(' ')}`)
    }

    return cmds
  },
  '*.{json,html,css,md,yml,yaml}': 'prettier --write',
}
