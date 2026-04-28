import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    q: 'Why are recharge prices increasing?',
    a: 'Networks invest in spectrum and infrastructure; costs often move to consumers. We help you compare packs and find value that fits your budget.',
  },
  {
    q: 'How can I get help?',
    a: 'Use Get Recharge Help to submit a request, or explore Recharge Funding and Emergency Recharge. Donors and NGOs on our platform review requests in demo mode.',
  },
  {
    q: 'Is this platform free?',
    a: 'Yes—browsing plans, awareness articles, and tools like Data Wallet (demo) are free. Sponsorship flows are illustrative only in this frontend demo.',
  },
]

export function FAQ() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-3xl"
    >
      <h2 className="text-center text-3xl font-bold text-foreground">
        Frequently asked questions
      </h2>
      <p className="mt-2 text-center text-muted-foreground">
        Honest answers about recharge costs and how Recharge Saathi supports you.
      </p>
      <Accordion type="single" collapsible className="mt-10 w-full">
        {faqItems.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-semibold">
              {item.q}
            </AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  )
}
