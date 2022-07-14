/**
 * @jest-environment jsdom
 */
//NOTA : import avec accolades(pour un endroit particulier du fichier)
//import sans accolade(le fichier en totalité)
import "@testing-library/jest-dom"
import {screen, waitFor} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js" //contient la créa dom de la note de frais
import { bills } from "../fixtures/bills.js"  //contient les données du test
import Bills from "../containers/Bills.js"

import { ROUTES, ROUTES_PATH} from "../constants/routes.js";//j'importe la const routes_path
import {localStorageMock} from "../__mocks__/localStorage.js";//j'importe la const localstoragemock
import mockStore from "../__mocks__/store"

import router from "../app/Router.js";
jest.mock("../app/Store", () => mockStore)


// *********************************test sur l'interface employée des anciennes factures*********************************************

//les describe regroupe plusieurs tests (1 sur la surbrillance et l'autre sur l'ordre décroissant)
describe("Given I am connected as an employee", () => { //je suis connecté en tant qu'employée
  describe("When I am on Bills Page", () => { //je suis sur la page facture
    
    test("Then bill icon in vertical layout should be highlighted", async () => { //icone de la note en vertical doit être en surbrillance

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      expect(windowIcon).toHaveClass("active-icon")

    })
    test("Then bills should be ordered from earliest to latest", () => {  //ensuite les notes doivent être en ordre croissant
      document.body.innerHTML = BillsUI({ data: bills })  //afficher les données du fichier views/billsUI
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)//regex de format date
      const antiChrono = (a, b) => ((a < b) ? 1 : -1) //  ordre croissant
      const datesSorted = [...dates].sort(antiChrono) //toutes les dates sont triés par date
      expect(dates).toEqual(datesSorted)  //je m'attends a ce que les données dates soit égal aux données datesSorted
    })  //la résolution du bug à eu lieu sur le fichier views/billsUI, car c'est le fichier d'affichage des bills(il manquait le trie par ordre croissant)
  })




  /*describe("When I click on the button 'Nouvelle note de frais'", () => {
    test("Then I should navigate to #employee/bill/new", () => {
      // Vérifie qu'on arrive bien sur la page NewBill
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const billsPage = new Bills({
        document, onNavigate, store: null, bills: bills, localStorage: window.localStorage
      })
      // on récupère la fonction pour le test
      const handleClickNewBill = jest.fn(billsPage.handleClickNewBill);
      // on récupère l'accès au bouton qui dirige vers la page souhaitée
      const btnNewBill = getByTestId(document.body, "btn-new-bill");
      // on simule l'action
      btnNewBill.addEventListener("click", handleClickNewBill);
      userEvent.click(btnNewBill);
      // on vérifie que la fonction est appelée et que la page souhaitée s'affiche
      expect(handleClickNewBill).toHaveBeenCalled();
      expect(
        getByText(document.body, "Envoyer une note de frais")
      ).toBeTruthy();
    });
  });

  describe("When I click on the eye icon", () => {
    test("A modal should open", () => {
      // Vérifie l'ouverture de la modale si click sur le bouton "oeil" d'une facture
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const billsPage = new Bills({
        document, onNavigate, store: null, bills: bills, localStorage: window.localStorage
      })
      // on affiche les factures dans le HTML
      document.body.innerHTML = BillsUI({ data: { bills } })
      // on mock la modale
      $.fn.modal = jest.fn();
      // on récupère le premier bouton trouvé
      const firstEyeIcon = getAllByTestId(document.body, "btn-new-bill")[0];
      // on récupère la fonction qui ouvre la modale
      const handleClickIconEye = jest.fn(
        billsPage.handleClickIconEye(firstEyeIcon)
      );
      // on simule l'action
      firstEyeIcon.addEventListener("click", handleClickIconEye);
      userEvent.click(firstEyeIcon);
      // on vérifie l'appel de la fonction et la présence de la modale
      expect(handleClickIconEye).toHaveBeenCalled();
      const modal = screen.getByTestId("modale");
      expect(modal).toBeTruthy();
    })
  })*/  
})
