/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import DashboardFormUI from "../views/DashboardFormUI.js"
import { formatDate } from "../app/format.js"

//**************************************test sur la transmission des factures employée vers admin*************************************

const bill = {
  "id": "47qAXb6fIm2zOKkLzMro",
  "vat": "80",
  "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
  "status": "accepted",
  "type": "Hôtel et logement",
  "commentAdmin": "ok",
  "commentary": "séminaire billed",
  "name": "encore",
  "fileName": "preview-facture-free-201801-pdf-1.jpg",
  "date": "2004-04-04",
  "amount": 400,
  "email": "a@a",
  "pct": 20
}

const billAccepted = {
  ...bill,
  "status": "accepted"
}

const billPending = {
  ...bill,
  "status": "pending"
}

const billrefused = {
  ...bill,
  "status": "refused"
}

describe('Given I am connected as an Admin and I am on Dashboard Page', () => { //je suis connectée en tant qu'admin et je suis sur la page des factures
  describe('When bill data is passed to DashboardUI', () => { //lorsque les données de facturation son transmises au tableau de bord
    test(('Then, it should them in the page'), () => {  //ces informations doivent se mettre dans la page
      const html = DashboardFormUI(bill)
      document.body.innerHTML = html
      expect(screen.getByText(bill.vat)).toBeTruthy()
      expect(screen.getByText(bill.type)).toBeTruthy()
      expect(screen.getByText(bill.commentary)).toBeTruthy()
      expect(screen.getByText(bill.name)).toBeTruthy()
      expect(screen.getByText(bill.fileName)).toBeTruthy()
      expect(screen.getByText(formatDate(bill.date))).toBeTruthy()
      expect(screen.getByText(bill.amount.toString())).toBeTruthy()
      expect(screen.getByText(bill.pct.toString())).toBeTruthy()
    })
  })
  describe('When pending bill is passed to DashboardUI', () => {  //lorsque la facture en attente est transmise au tableau de bord
    test(('Then, it should show button and textArea'), () => {  //devrait afficher le bouton et la zone de texte
      const html = DashboardFormUI(billPending)
      document.body.innerHTML = html
      expect(screen.getByText("Accepter")).toBeTruthy()
      expect(screen.getByText("Refuser")).toBeTruthy()
      expect(screen.getByTestId("commentary2")).toBeTruthy()
    })
  })
  describe('When accepted bill is passed to DashboardUI', () => { //lorsque la facture acceptée est transmise au tableau de bord
    test(('Then, it should show admin commentary'), () => { //devrait afficher le commentaire de l'admin
      const html = DashboardFormUI(billAccepted)
      document.body.innerHTML = html
      expect(screen.getByText(bill.commentAdmin)).toBeTruthy()
    })
  })
  describe('When refused bill is passed to DashboardUI', () => {  //lorsque la facture refusée est transmise au tableau de bord
    test(('Then, it should show admin commentary'), () => { //devrait afficher le commentaire de l'admin
      const html = DashboardFormUI(billrefused)
      document.body.innerHTML = html
      expect(screen.getByText(bill.commentAdmin)).toBeTruthy()
    })
  })
})

