export default function Testimonials() {
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

  return (
    <section
      id="depoimentos"
      className="py-20 lg:py-32 bg-gradient-to-br from-brand-light-beige via-white to-brand-beige/30 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-straw/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-primary-800 mb-6">
            Opiniões de quem já passou por aqui
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-brand-straw mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            O que nossos pacientes falam sobre o{' '}
            <span className="font-semibold text-primary-600">
              cuidado humanizado
            </span>{' '}
            e
            <span className="font-semibold text-secondary-600">
              {' '}
              excelência técnica
            </span>{' '}
            que oferecemos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-brand-beige/30 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 hover:bg-white/90 relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary-200/20 to-brand-straw/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-brand-straw fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-neutral-700 mb-6 leading-relaxed italic font-light text-base">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Patient Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-brand-straw/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-serif font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary-800">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-neutral-500">Paciente</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust section */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-brand-beige/30 max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">
              Atendimento Extraordinário
            </h3>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              &quot;Uma médica muito humana, que sabe confortar e acolher seus
              pacientes. Quem dera se encontrássemos profissionais com o tato e
              a sensibilidade dessa médica em outras áreas.&quot;
            </p>
            <div className="flex items-center justify-center gap-2 text-brand-straw">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              Avaliação média dos pacientes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
