/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

//******************************************************** */
//                CONTINUER LE CODE 
//********************************************************* */

describe("Given I am connected as an employee", () => { //je suis connectée en tant qu'employée
  describe("When I am on NewBill Page", () => { //je suis sur une nouvelle facture
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
  })
})
