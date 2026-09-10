'use client'

import { useState, useRef, useEffect } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { InfoCard } from '@/components/ui/InfoCard'

function getCardsPerView() {
  if (window.innerWidth >= 1024) return 3 // desktop
  if (window.innerWidth >= 768) return 2 // tablet
  return 1 // mobile
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const carouselRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: 'Maria S.',
      text: 'Médica muito atenciosa, eficiente e tira todas as suas dúvidas sem pressa. Resolveu meu problema. Continue assim!!',
      rating: 5,
    },
    {
      name: 'Ana C.',
      text: 'A Dra me atendeu tão bem! Não poderia ter escolhido lugar melhor!!! Agora vou ser uma cliente fiel!',
      rating: 5,
    },
    {
      name: 'Carlos M.',
      text: 'Dra Dayara foi muito educada e atenciosa com a minha mãe tirou todas as suas dúvidas. Minha mãe adorou e além de tudo é uma pessoa de luz que olha o próximo com carinho.',
      rating: 5,
    },
    {
      name: 'Roberto P.',
      text: 'Atendimento excelente, médica super competente, me tratou super bem. Super satisfeito com o atendimento. Recomendo!!!',
      rating: 5,
    },
    {
      name: 'Juliana L.',
      text: 'A doutora me fez sentir muito a vontade, escutou todas as minhas dúvidas e soube responder a todas elas. Muito atenciosa e doce. Adorei a consulta.',
      rating: 5,
    },
    {
      name: 'Sandra F.',
      text: 'Maravilhosa! Muito bem humorada, simpática e explica tudo detalhadamente. Queria que fosse minha médica em todas as especialidades.',
      rating: 5,
    },
    {
      name: 'Ricardo T.',
      text: 'Melhor escolha ter ido na Dra. Dayara. Fiquei super a vontade e ela foi muito atenciosa com todos os detalhes.',
      rating: 5,
    },
    {
      name: 'Paulo S.',
      text: 'Recomendo a Dra. Dayara, sobretudo para quem, como, foi a primeira vez a uma proctologista. Excelente profissional, atenciosa e bem humorada. Explicou tudo de maneira muito didática.',
      rating: 5,
    },
    {
      name: 'João M.',
      text: 'Dayara é um profissional ímpar. Atenciosa, didática e super bem humorada para quebrar qualquer barreira. Aos homens que tratam essa visita como um tabu, parem de bobeira e venham tranquilos pois o atendimento é excepcional.',
      rating: 5,
    },
  ]

  // Handle client-side hydration and window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView())
      setCurrentIndex(0) // Reset to first slide on resize
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(testimonials.length / cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0) // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
    // Prevent horizontal page scroll during carousel touch interaction
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <section
      id="depoimentos"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--color-cream) 0%, #ffffff 50%, var(--color-beige) 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-straw)' }}
        ></div>
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <SectionHeader
          title="Opiniões de quem já passou por aqui"
          lead={
            <>
              O que nossos pacientes falam sobre o{' '}
              <span className="font-semibold text-copper">
                cuidado humanizado
              </span>{' '}
              e{' '}
              <span className="font-semibold text-teal">excelência técnica</span>{' '}
              que oferecemos
            </>
          }
        />

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto lg:px-10">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Depoimento anterior"
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-beige bg-white/80 text-copper shadow-sm transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Próximo depoimento"
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-beige bg-white/80 text-copper shadow-sm transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel Cards */}
          <div
            className="overflow-hidden touch-pan-y"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 py-4"
                >
                  {testimonials
                    .slice(
                      slideIndex * cardsPerView,
                      (slideIndex + 1) * cardsPerView
                    )
                    .map((testimonial, cardIndex) => (
                      <InfoCard
                        key={slideIndex * cardsPerView + cardIndex}
                        as="article"
                        surface="translucent"
                        className="relative mx-auto flex max-w-md flex-col justify-between overflow-hidden"
                      >
                        {/* Decorative quote mark */}
                        <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-copper to-straw opacity-20">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                          </svg>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-4 w-4 fill-current text-straw"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-700 mb-4 leading-relaxed italic font-light text-sm">
                          &quot;{testimonial.text}&quot;
                        </p>

                        {/* Patient Name */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-copper to-straw">
                            <span className="text-white font-serif font-semibold text-sm">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-teal">
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-gray-500">Paciente</p>
                          </div>
                        </div>
                      </InfoCard>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                className={`h-2 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper ${
                  index === currentIndex ? 'w-6 bg-copper' : 'w-2 bg-beige'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust section */}
        <div className="text-center mt-16">
          <InfoCard surface="translucent" padding="spacious" className="mx-auto max-w-3xl">
            <h3 className="mb-4 font-sans text-2xl font-bold text-teal">
              Atendimento Extraordinário
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              &quot;Uma médica muito humana, que sabe confortar e acolher seus
              pacientes. Quem dera se encontrássemos profissionais com o tato e
              a sensibilidade dessa médica em outras áreas.&quot;
            </p>
            <div className="flex items-center justify-center gap-2 text-straw">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Avaliação média dos pacientes
            </p>
          </InfoCard>
        </div>
      </div>
    </section>
  )
}
