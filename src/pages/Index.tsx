import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const portfolioItems = [
  {
    id: 1,
    category: 'helmets',
    title: 'Пламя Скорости',
    image: 'https://cdn.poehali.dev/projects/71b8666f-87fc-41df-8bd4-7098672c5b55/files/dcb60b53-07ed-46e6-890c-6c60de741283.jpg',
    description: 'Агрессивная роспись шлема AGV'
  },
  {
    id: 2,
    category: 'jackets',
    title: 'Tribal Metal',
    image: 'https://cdn.poehali.dev/projects/71b8666f-87fc-41df-8bd4-7098672c5b55/files/14c5050c-0d39-44cd-944f-876678f1fa2d.jpg',
    description: 'Кастом-роспись кожаной куртки'
  },
  {
    id: 3,
    category: 'process',
    title: 'Процесс создания',
    image: 'https://cdn.poehali.dev/projects/71b8666f-87fc-41df-8bd4-7098672c5b55/files/a4db0b76-0863-4417-a0f2-8c561ce673f4.jpg',
    description: 'Профессиональная аэрография'
  },
];

const Index = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: '',
    message: ''
  });

  const slides = [
    {
      title: 'Серийный. Как у всех.',
      subtitle: 'Превратите обычную экипировку в произведение искусства',
      image: 'https://cdn.poehali.dev/projects/71b8666f-87fc-41df-8bd4-7098672c5b55/files/dcb60b53-07ed-46e6-890c-6c60de741283.jpg'
    },
    {
      title: 'Это будете ВЫ',
      subtitle: 'Уникальная роспись мото-экипировки уровня кастом-шоу',
      image: 'https://cdn.poehali.dev/projects/71b8666f-87fc-41df-8bd4-7098672c5b55/files/14c5050c-0d39-44cd-944f-876678f1fa2d.jpg'
    },
    {
      title: 'Процесс мастерства',
      subtitle: 'Профессиональная аэрография с гарантией 3 года',
      image: 'https://cdn.poehali.dev/projects/71b8666f-87fc-41df-8bd4-7098672c5b55/files/a4db0b76-0863-4417-a0f2-8c561ce673f4.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: '', contact: '', type: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary/40 blur-lg rounded-full"></div>
                <img 
                  src="https://cdn.poehali.dev/files/f200a1c7-5ec5-4d18-b65d-fe95bd255e4e.png" 
                  alt="Custom Asura" 
                  className="relative z-10 h-full w-full object-contain"
                />
              </div>
              <h1 className="text-2xl font-black text-gradient">CUSTOM ASURA</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">Примеры работ</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary transition-colors">Как это работает</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">Цены</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-primary transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Контакты</button>
            </nav>
            <div className="flex items-center gap-3">
              <a href="tel:+7XXXXXXXXXX" className="hidden md:block text-sm">+7 (XXX) XXX-XX-XX</a>
              <Button onClick={() => scrollToSection('contact')} className="bg-primary hover:bg-primary/90 glow-orange">
                Заказать эскиз
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-screen overflow-hidden mt-16">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})`
              }}
            />
          </div>
        ))}
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mb-48">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              {slides[activeSlide].title.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? 'text-gradient' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">{slides[activeSlide].subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('contact')} className="bg-primary hover:bg-primary/90 text-lg px-8 glow-orange-strong">
                <Icon name="Brush" className="mr-2" />
                Заказать эскиз бесплатно
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('portfolio')} className="text-lg px-8 border-metal bg-background/50 backdrop-blur-sm hover:bg-background/80">
                Портфолио
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-24 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-border">
              {[
                { icon: 'Shield', text: 'Гарантия 3 года' },
                { icon: 'Truck', text: 'Доставка по РФ' },
                { icon: 'Users', text: '350+ клиентов' },
                { icon: 'Award', text: 'С 2018 года' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Icon name={item.icon} size={32} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeSlide ? 'bg-primary w-8 glow-orange' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Почему серийная экипировка <span className="text-gradient">убивает</span> вашу индивидуальность?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Вы купили качественный шлем и куртку за немалые деньги, но на первой же встрече байкеров обнаружили ещё троих с точно такими же. Серийная экипировка — компромисс между безопасностью и безликостью.
          </p>
          <div className="metal-gradient p-8 rounded-lg cursor-pointer transition-all duration-500 hover:scale-105 hover:glow-orange group">
            <p className="text-xl italic mb-4 group-hover:text-primary transition-colors duration-300">
              "Я год ездил в чёрном AGV, пока не заказал роспись в стиле японского демона. Теперь меня узнают все — это невероятное чувство."
            </p>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">— Дмитрий, Yamaha R1, Москва</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            350+ уникальных <span className="text-gradient">дизайнов</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">Найдите вдохновение</p>
          
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="helmets">Шлемы</TabsTrigger>
              <TabsTrigger value="jackets">Куртки</TabsTrigger>
              <TabsTrigger value="process">Процесс</TabsTrigger>
            </TabsList>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group cursor-pointer hover:glow-orange transition-all">
                  <div className="relative overflow-hidden aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            От идеи до <span className="text-gradient">шедевра</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16">Прозрачный процесс за 5 шагов</p>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { icon: 'MessageSquare', title: 'Заявка', desc: 'Фото экипировки и пожелания' },
              { icon: 'Palette', title: 'Эскизы', desc: '3 варианта за 24–48 часов' },
              { icon: 'CheckCircle', title: 'Согласование', desc: 'Правки до полного совпадения' },
              { icon: 'Paintbrush', title: 'Роспись', desc: '5–10 дней, фото прогресса' },
              { icon: 'Package', title: 'Получение', desc: 'Доставка + сертификат' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-orange">
                  <Icon name={step.icon} size={32} className="text-primary" />
                </div>
                <div className="text-3xl font-black text-gradient mb-2">{index + 1}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Прозрачные <span className="text-gradient">цены</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16">Без скрытых доплат</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Базовый',
                price: 'от 8 000₽',
                features: ['1–2 цвета', '5 дней', 'Гарантия 2 года'],
                popular: false
              },
              {
                name: 'Стандарт',
                price: 'от 15 000₽',
                features: ['Многоцветный дизайн', '7 дней', 'Гарантия 3 года', 'UV-лак'],
                popular: true
              },
              {
                name: 'Премиум',
                price: 'от 25 000₽',
                features: ['Эксклюзивный дизайн', '10 дней', 'Гарантия 5 лет', 'Спецэффекты', 'Чехол в подарок'],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`p-8 ${plan.popular ? 'border-primary glow-orange scale-105' : ''}`}>
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      Популярный
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-black text-center mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-center mb-6 text-gradient">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 glow-orange' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Заказать
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Нам доверяют байкеры из <span className="text-gradient">47 городов</span> России
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-3xl mx-auto">
            {[
              { label: 'Рейтинг', value: '4.9/5.0' },
              { label: 'Отзывов', value: '230+' },
              { label: 'Рекомендуют', value: '98%' },
              { label: 'Повторных', value: '87%' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Алексей М.',
                text: 'Сделали роспись шлема за неделю. Качество на высоте, все как обсуждали. Теперь меня узнают на каждой встрече!',
                rating: 5
              },
              {
                name: 'Сергей К.',
                text: 'Заказывал роспись куртки Dainese. Мастера — профи своего дела, учли все пожелания. Гарантия реально работает!',
                rating: 5
              }
            ].map((review, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <p className="font-bold">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            Ответы на главные <span className="text-gradient">вопросы</span>
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: 'Не испортится ли роспись?', a: 'Используем профессиональные автомобильные краски и UV-защитный лак. Гарантия качества 3 года. Роспись выдерживает любые погодные условия.' },
              { q: 'Можно ли расписать экипировку с царапинами?', a: 'Да! Мы либо маскируем дефекты, либо органично встраиваем их в дизайн. Часто царапины становятся частью уникального стиля.' },
              { q: 'Как ухаживать за расписанной экипировкой?', a: 'Протирайте мягкой микрофиброй с автошампунем. Избегайте абразивных средств. Полная инструкция по уходу прилагается.' },
              { q: 'Сколько стоит доставка?', a: 'Бесплатная доставка по России от 15 000₽. До этой суммы — 500–800₽ в зависимости от региона.' },
              { q: 'Можно увидеть процесс работы?', a: 'Да! Отправляем фото прогресса каждые 2 дня. Также можете приехать в мастерскую на экскурсию.' },
              { q: 'Что если результат не понравится?', a: 'Вы утверждаете эскиз до начала работ. Если на этапе эскиза не устроит — вернем предоплату. После согласования — бесплатная переделка по гарантии.' },
              { q: 'Работаете с другими поверхностями?', a: 'Да! Расписываем автомобили, скейтборды, ноутбуки, гитары и любые другие поверхности.' },
              { q: 'Какие сроки выполнения?', a: 'Шлем: 5–10 дней. Куртка: 7–14 дней. Мотоцикл (бак): 10–20 дней. Зависит от сложности дизайна.' }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-bold hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Готовы стать <span className="text-gradient">легендой</span> на дороге?
          </h2>
          <p className="text-center text-muted-foreground mb-8">Заказать бесплатный эскиз за 2 минуты</p>
          
          <Card className="p-8 glow-orange">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Имя</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ваше имя"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Телефон / Telegram / WhatsApp</label>
                <Input 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="+7 (XXX) XXX-XX-XX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Тип работы</label>
                <Input 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  placeholder="Шлем / Куртка / Бак / Другое"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Ваша идея (опционально)</label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Опишите ваши пожелания по дизайну..."
                  rows={4}
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 glow-orange-strong">
                <Icon name="Send" className="mr-2" />
                Получить 3 эскиза бесплатно
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center space-y-2">
            <p className="text-primary font-bold">⚡ Скидка 10% до конца месяца</p>
            <p className="text-sm text-muted-foreground">Осталось 3 слота на ноябрь</p>
          </div>

          <div className="mt-12 text-center space-y-4">
            <h3 className="text-2xl font-black">Контакты</h3>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <Icon name="Phone" size={20} />
                +7 (XXX) XXX-XX-XX
              </p>
              <p className="flex items-center justify-center gap-2">
                <Icon name="Mail" size={20} />
                info@moto-art.ru
              </p>
              <p className="flex items-center justify-center gap-2">
                <Icon name="MapPin" size={20} />
                Москва, ул. Примерная, д. 10
              </p>
              <p className="flex items-center justify-center gap-2">
                <Icon name="Clock" size={20} />
                Пн–Пт 10:00–19:00, Сб 11:00–17:00
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="MessageCircle" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Instagram" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Send" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 MotoArt. Все права защищены</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:text-primary">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary">Договор оферты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;