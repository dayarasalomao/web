'use client'

import { useState, useRef } from 'react'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
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

  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3 // desktop
      if (window.innerWidth >= 768) return 2 // tablet
    }
    return 1 // mobile
  }

  const cardsPerView = getCardsPerView()
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
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-cream) 0%, #ffffff 50%, var(--color-beige) 100%)',
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
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--color-teal)' }}
          >
            Opiniões de quem já passou por aqui
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, var(--color-copper), var(--color-straw))',
            }}
          ></div>
          <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            O que nossos pacientes falam sobre o{' '}
            <span className="font-semibold" style={{ color: 'var(--color-copper)' }}>
              cuidado humanizado
            </span>{' '}
            e{' '}
            <span className="font-semibold" style={{ color: 'var(--color-teal)' }}>
              excelência técnica
            </span>{' '}
            que oferecemos
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-200 hover:shadow-lg -translate-x-6"
            style={{ color: 'var(--color-copper)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-200 hover:shadow-lg translate-x-6"
            style={{ color: 'var(--color-copper)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Cards */}
          <div 
            className="overflow-hidden"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
                >
                  {testimonials
                    .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                    .map((testimonial, cardIndex) => (
                      <div
                        key={slideIndex * cardsPerView + cardIndex}
                        className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/90 relative overflow-hidden"
                      >
                        {/* Decorative quote mark */}
                        <div
                          className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center opacity-20"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-copper), var(--color-straw))',
                          }}
                        >
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
                              className="w-4 h-4 fill-current"
                              style={{ color: 'var(--color-straw)' }}
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
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, var(--color-copper), var(--color-straw))',
                            }}
                          >
                            <span className="text-white font-serif font-semibold text-sm">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: 'var(--color-teal)' }}>
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-gray-500">Paciente</p>
                          </div>
                        </div>
                      </div>
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
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'w-6' : 'w-2'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? 'var(--color-copper)' : 'var(--color-beige)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Trust section */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: 'var(--color-teal)' }}>
              Atendimento Extraordinário
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              &quot;Uma médica muito humana, que sabe confortar e acolher seus
              pacientes. Quem dera se encontrássemos profissionais com o tato e
              a sensibilidade dessa médica em outras áreas.&quot;
            </p>
            <div className="flex items-center justify-center gap-2" style={{ color: 'var(--color-straw)' }}>
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
          </div>
        </div>
      </div>
    </section>
  )
}
