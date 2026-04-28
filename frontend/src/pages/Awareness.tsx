import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/data/articles'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Awareness() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold">Awareness hub</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Plain-language guides so you can save money and stay safe online.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {articles.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <Card className="overflow-hidden border-border/80 shadow-card transition-shadow hover:shadow-soft">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={a.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {a.category}
                </span>
                <h2 className="mt-2 text-xl font-bold leading-snug">{a.title}</h2>
                <p className="mt-3 text-muted-foreground">{a.excerpt}</p>
                <Button
                  variant="ghost"
                  className="mt-4 gap-2 px-0 text-primary hover:bg-transparent hover:text-primary/80"
                  type="button"
                >
                  Read more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
