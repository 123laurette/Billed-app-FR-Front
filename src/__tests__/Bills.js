/**
 * @jest-environment jsdom
 */
//NOTA : import avec accolades(pour un endroit particulier du fichier)
//import sans accolade(le fichier en totalité)
import "@testing-library/jest-dom"
 import {fireEvent, screen, waitFor} from "@testing-library/dom"
 import BillsUI from "../views/BillsUI.js" //contient la créa dom de la note de frais
 import Bills from "../containers/Bills.js";
 import { bills } from "../fixtures/bills.js"  //contient les données du test

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

  describe("je clique sur le bouton 'Nouvelle note de frais'", () => {//je clique sur le bouton nouvelle note de frais
    test("une nouvelle note de frais apparait", () => { // Vérifie qu'on arrive bien sur la page NewBill

      //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      //J'intègre le chemin d'accès
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const billsPage = new Bills({//créa instance de bill
        document,
        onNavigate,
        store: null,
        bills: bills,
        localStorage: window.localStorage
      })
      //créa const pour fonction qui appel la fonction a tester
      const OuvertureNewBill = jest.fn(billsPage.handleClickNewBill);
      const btnNewBill = screen.getByTestId("btn-new-bill")//cible le btn nouvelle note de frais
      btnNewBill.addEventListener("click", OuvertureNewBill)//écoute évènement
      fireEvent.click(btnNewBill)//simule évènement au click
      // on vérifie que la fonction est appelée et que la page souhaitée s'affiche
      expect(OuvertureNewBill).toHaveBeenCalled()//je m'attends à ce que la page nouvelle note de frais se charge
      expect(screen.getByText("Envoyer une note de frais")).toBeTruthy()//la nouvelle note de frais apparait avec entête envoyer une note de frais
    })
  })

  describe("je suis sur la page des facture et je clique sur l'icone oeil", () => {
    test("le justificatif qui a été chargé apparait", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock})
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))

      const html = BillsUI({ data: bills })
      $.fn.modal = jest.fn()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const store = null
      const billsView = new Bills({
        document,
        onNavigate,
        store,
        localStorage: window.localStorage,
      })
      const iconeOeil = screen.getAllByTestId('icon-eye')[0]
      const clickIconeOeil = jest.fn(billsView.handleClickIconEye)
      iconeOeil.addEventListener('click', clickIconeOeil(iconeOeil))
      fireEvent.click(iconeOeil)
      expect(screen.getByText("Justificatif")).toBeTruthy()
    })
  })

  //********************************************************************************************* */

  describe('When an error occurs on API', () => { //erreur sur l'api
    beforeEach(() => {
      jest.spyOn(mockStore, 'bills')
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      })
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          type: 'Employee',
          email: 'a@a',
        })
      )
      const root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.appendChild(root)
      router()
    })

    test('fetches bills from an API and fails with 404 message error', async () => {//recupère les facture api et echoue avec erreur 404
      mockStore.bills.mockImplementationOnce(() => {
        return {
          list: () => {
            return Promise.reject(new Error("Erreur 404"))
          },
        }
      })
      window.onNavigate(ROUTES_PATH.Bills)
      await new Promise(process.nextTick)
      const message = screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })

    test('fetches messages from an API and fails with 500 message error', async () => {//recupère les facture api et echoue avec erreur 500
      mockStore.bills.mockImplementationOnce(() => {
        return {
          list: () => {
            return Promise.reject(new Error("Erreur 500"))
          },
        }
      })

      window.onNavigate(ROUTES_PATH.Bills)
      await new Promise(process.nextTick)
      const message = screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})