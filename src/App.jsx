import Header from "./components/header/Header"
import NewListing from "./components/newListing/NewListing"
import NewListingForm from "./components/newListing/NewListingForm"
import Ido_Ieo from './components/ido/Ido_Ieo'
import IdoForm from "./components/ido/IdoForm"
import NewProject from './components/newProject/NewProject'
import NewProjectForm from "./components/newProject/NewProjectForm"
import FundingRound from './components/fundingRound/FundingRound'
import FundingRoundForm from './components/fundingRound/FundingRoundForm'
import EcoSystem from './components/ecoSystem/EcoSystem'
import EcoSystemForm from './components/ecoSystem/EcoSystemForm'
import UnusualActivity from "./components/unusualActivity/UnusualActivity"
import UnusualActivityFrom from "./components/unusualActivity/UnusualActivityFrom"
import KillerProject from "./components/killerProject/KillerProject"
import KillerProjectForm from './components/killerProject/KillerProjectForm'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Hotnews from "./components/hotnews/Hotnews"
import HotnewsForm from "./components/hotnews/HotnewsForm"
import Airdrop from "./components/airdrop/Airdrop"
import AirdropForm from "./components/airdrop/AirdropForm"
import Toaster from "./components/toaster/Toaster"

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/newListing" element={<NewListing />}></Route>
          <Route path="/newListingForm" element={<NewListingForm />}></Route>
          <Route path="/newListingForm/:id" element={<NewListingForm />}></Route>
          <Route path="/ido" element={<Ido_Ieo />}></Route>
          <Route path="/idoForm" element={<IdoForm />}></Route>
          <Route path="/idoForm/:id" element={<IdoForm />}></Route>
          <Route path="/newProject" element={<NewProject />}></Route>
          <Route path="/newProjectForm" element={<NewProjectForm />}></Route>
          <Route path="/newProjectForm/:id" element={<NewProjectForm />}></Route>
          <Route path="/fundingRound" element={<FundingRound />}></Route>
          <Route path="/fundingRoundForm" element={<FundingRoundForm />}></Route>
          <Route path="/fundingRoundForm/:id" element={<FundingRoundForm />}></Route>
          <Route path="/ecoSystem" element={<EcoSystem />}></Route>
          <Route path="/ecoSystemForm" element={<EcoSystemForm />}></Route>
          <Route path="/ecoSystemForm/:id" element={<EcoSystemForm />}></Route>
          <Route path="/unusualActivity" element={<UnusualActivity />}></Route>
          <Route path="/unusualActivityFrom" element={<UnusualActivityFrom />}></Route>
          <Route path="/unusualActivityFrom/:id" element={<UnusualActivityFrom />}></Route>
          <Route path="/killerProject" element={<KillerProject />}></Route>
          <Route path="/killerProjectForm" element={<KillerProjectForm />}></Route>
          <Route path="/killerProjectForm/:id" element={<KillerProjectForm />}></Route>
          <Route path="/hot-news" element={<Hotnews></Hotnews>}></Route>
          <Route path="/hot-news-form" element={<HotnewsForm />}></Route>
          <Route path="/hot-news-form/:id" element={<HotnewsForm />}></Route>
          <Route path="/airdrop" element={<Airdrop />}></Route>
          <Route path="/airdrop-form" element={<AirdropForm />}></Route>
          <Route path="/airdrop-form/:id" element={<AirdropForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
