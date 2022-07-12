/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"
import { fireEvent, screen } from "@testing-library/dom"
import userEvent from '@testing-library/user-event'
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import Bills from "../containers/Bills.js"
import BillsUI from "../views/BillsUI.js" //endroit ou se trouve sur btn_new-bill
import {localStorageMock} from "../__mocks__/localStorage.js";//j'importe la const localstoragemock
import { ROUTES } from '../constants/routes'
import mockStore from '../__mocks__/store'



describe("Given I am connected as an employee", () => {
  describe("je suis sur une nouvelle facture et les champs date, TTC et fichier joint sont vides", () => {
    test ("la note de frais reste à l'écran", () => {

      //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      
      //je suis sur une nouvelle note de frais
      const html = NewBillUI()          //crea const qui represente le formulaire
      document.body.innerHTML = html
      
      //je ne remplis pas les champs date, ttc et fichier joint
      const date = screen.getByTestId("datepicker"); //Champ de la date
      expect(date.value).toBe("");

      const ttc = screen.getByTestId("amount"); //Champ du TTC
      expect(ttc.value).toBe(""); 

      const fichier = screen.getByTestId("file") //Champ du fichier
      expect(fichier.value).toBe("")

      const formNewBill = screen.getByTestId("form-new-bill")//je cible le formulaire de la nouvelle note de frais
      expect(formNewBill).toBeTruthy()//le formulaire vide apparait correctement
      
      const envoiNewBill = jest.fn((e) => e.preventDefault())//creat de fonction pour stopper l'action par défaut
      formNewBill.addEventListener("submit", envoiNewBill)//ecoute d'évènement
      fireEvent.submit(formNewBill)//simulation de l'évènement
      expect(screen.getByTestId("form-new-bill")).toBeTruthy()//après l'évènement le formulaire reste à l'écran
      
    })
  })


  describe("quand je clique sur le bouton nouvelle note de frais", () => {
    test("Alors un formulaire de saisie apparait", () => {

      const html = NewBillUI          //crea const qui represente le formulaire
      document.body.innerHTML = html
      const btn = BillsUI             //crea const qui represente l'endroit du btn
      document.body.innerHTML = btn
      
      const btnNewBill = screen.getByTestId("btn-new-bill");  //cible le btn
      const ouvreNewBill = jest.fn((e) => e.style.display = Block); //simule la fonction et le display block

      fireEvent.click(btnNewBill);  //simule l'evenement

      btnNewBill.addEventListener("click", ouvreNewBill);// evt au click sur le btn et prise en compte de la fonction

      expect(html).toBeTruthy(); //la simulation doit donner la newbill
    })
  })


  
  describe("je clique sur choisir un fichier et je telecharge le fichier dans le bon format", () => {
    test ("mon champ est validé", () => {
       //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
      type: 'Employee'
      }))
    
       //je suis sur une nouvelle note de frais
      const html = NewBillUI()          //crea const qui represente le formulaire
      document.body.innerHTML = html
      const onNavigate = (pathname) => {  //je charge le fichier route
      document.body.innerHTML = ROUTES({ pathname})
      }
       const newBill = new NewBill({ //je crée une nouvelle instance newbill
        document,
        onNavigate,
        store: null,
        localStorage: window, localStorage,
      })
      const chargeFichier = jest.fn(newBill => newBill)
      const fichier = screen.getByTestId("file")
      const testFormat = new File(["c'est un test"], {
        accept: "image/jpg"
      })
      fichier.addEventListener("change", chargeFichier)
      fireEvent.change(fichier, {target: {files: [testFormat]}})
      
      expect(chargeFichier).toHaveBeenCalled()
      expect(fichier.files[0]).toStrictEqual(testFormat)
    })
  })
})
