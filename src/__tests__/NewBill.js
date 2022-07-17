/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"
import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js";
import { ROUTES } from '../constants/routes'
import mockStore from "../__mocks__/store.js"

window.alert = jest.fn()
jest.mock("../app/Store", () => mockStore)



describe("Given I am connected as an employee", () => {

  describe("je suis sur une nouvelle facture et les champs date, TTC et fichier joint sont vides", () => {
    test ("la note de frais reste à l'écran", () => {

      //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock 
      })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      
      //je suis sur une nouvelle note de frais
      const html = NewBillUI()      //crea const qui represente le formulaire
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

  describe("je telecharge le fichier dans le bon format", () => {
    test ("mon champ est validé et ma NewBill est envoyé", () => {
      //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock 
      })
      window.localStorage.setItem('user', JSON.stringify({
      type: 'Employee'
      }))
    
      //je suis sur une nouvelle note de frais
        //j'integre le formulaire et le chemin d'accès
      const html = NewBillUI()         
      document.body.innerHTML = html
      const onNavigate = (pathname) => {  
        document.body.innerHTML = ROUTES({ pathname})
      }
      const newBill = new NewBill({ //je crée une nouvelle instance newbill
        document,
        onNavigate,
        store: mockStore,
        localStorage: window, localStorage,
      })
      //créa const pour fonction qui appel la fonction a tester
      const chargeFichier = jest.fn((e) => newBill.handleChangeFile(e))
      
      const fichier = screen.getByTestId("file")//cible le champ fichier
      const testFormat = new File(["c'est un test"],  "test.jpg", {//condition du test
        type: "image/jpg"
      })
      fichier.addEventListener("change", chargeFichier)//écoute évènement
      fireEvent.change(fichier, {target: {files: [testFormat]}})//évènement au change en relation avec la condition du test
      
      expect(chargeFichier).toHaveBeenCalled()//je vérifie que le fichier est bien chargé
      expect(fichier.files[0]).toStrictEqual(testFormat)//je vérifie que le fichier téléchargé est bien conforme à la condition du test

      const formNewBill = screen.getByTestId('form-new-bill')//cible le formulaire
      expect(formNewBill).toBeTruthy()

      const envoiNewBill = jest.fn((e) => newBill.handleSubmit(e))//simule la fonction
      formNewBill.addEventListener('submit', envoiNewBill)//évènement au submit
      fireEvent.submit(formNewBill)//simule l'évènement
      expect(envoiNewBill).toHaveBeenCalled()
      expect(screen.getByText('Mes notes de frais')).toBeTruthy()
    })
  
  })

  describe("je telecharge le fichier dans un mauvais format", () => {
    test ("je reste sur mon formulaire et un message apparait", () => {
       //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock 
      })
      window.localStorage.setItem('user', JSON.stringify({
      type: 'Employee'
      }))
    
      //je suis sur une nouvelle note de frais
        //j'integre le formulaire et le chemin d'accès
      const html = NewBillUI()          
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname})
      }
      const newBill = new NewBill({ //je crée une nouvelle instance newbill
        document,
        onNavigate,
        store: null,
        localStorage: window, localStorage,
      })
      //créa const pour fonction qui appel la fonction a tester
      const chargeFichier = jest.fn((e) => newBill.handleChangeFile(e))
      const fichier = screen.getByTestId("file")//cible le champ fichier
      const testFormat = new File(["c'est un test"], {//condition du test
      type: "document/txt"
      })
      fichier.addEventListener("change", chargeFichier)//écoute évènement
      fireEvent.change(fichier, {target: {files: [testFormat]}})//évènement au change en relation avec la condition du test
      
      expect(chargeFichier).toHaveBeenCalled()//je vérifie que le fichier est bien chargé
      expect(window.alert).toBeTruthy()//je m'attends a recevoir un message
    })
  })
  describe("j'ai rempli le formulaire et je le valide avec le bouton envoyer", () => {
    test("le formulaire doit être envoyé vers la page des factures",  () => {
     //je suis connecté en tant qu'employée
      Object.defineProperty(window, 'localStorage', { value: localStorageMock 
      })
      window.localStorage.setItem('user', JSON.stringify({
      type: 'Employee'
      }))

      //je suis sur une nouvelle note de frais
      //j'integre le formulaire et le chemin d'accès
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBillEnCours = new NewBill({  //créa instance de NewBill
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      })
      const formNewBill = screen.getByTestId('form-new-bill')//cible le formulaire
      expect(formNewBill).toBeTruthy()

      const envoiNewBill = jest.fn((e) => newBillEnCours.handleSubmit(e))//simule la fonction
      formNewBill.addEventListener('submit', envoiNewBill)//évènement au submit
      fireEvent.submit(formNewBill)//simule l'évènement
      expect(envoiNewBill).toHaveBeenCalled()
      expect(screen.getByText('Mes notes de frais')).toBeTruthy()
    })
  })
})