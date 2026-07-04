import { createContext, useContext } from 'react'

/** ネイティブのガジェット単体窓の内側かどうか。true なら header 側が ⚙ を出すので
 *  Tool 内の OpenConfigButton (ホバー ⚙) は二重になるため自身を隠す。 */
export const GadgetWindowContext = createContext(false)

export const useInGadgetWindow = () => useContext(GadgetWindowContext)
