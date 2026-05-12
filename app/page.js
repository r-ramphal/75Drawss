import Navbar from './components/navbar'
import Hero from './components/hero'
import Ticker from './components/ticker'
import HowItWorks from './components/howitworks'
import Features from './components/features'
import OrderForm from './components/orderform'
import SendIn from './components/sendin'
import FAQ from './components/faq'
import Footer from './components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <HowItWorks />
      <Features />
      <OrderForm />
      <SendIn />
      <FAQ />
      <Footer />
    </main>
  )
}