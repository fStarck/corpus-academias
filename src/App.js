import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { ImWhatsapp, ImLocation } from "react-icons/im";
import { LuMenu } from "react-icons/lu";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaAngleDown } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagram, FaPlus } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import CardAula from "./CardAula";
import aulas from "./aulas.json";

function App() {
  // Configuração para o slider do hero
  const heroSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Configuração para o slider de cards
  const cardSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,




    responsive: [
      {
        breakpoint: 768, // Para telas menores que 768px
        settings: {
          slidesToShow: 1,
          speed: 1500,
          centerMode: true, // Ativa o modo centralizado
          centerPadding: "22px", // Espaço visível dos lados (ajuste conforme necessário)      
        },
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalPoliticaSeguranca, setModalPoliticaSeguranca] = useState(false);
  const [isModalTermosServico, setModalTermosServico] = useState(false);
  const [isModalConfiguracaoCookies, setModalConfiguracaoCookies] = useState(false);
  const [isModalAgendeAulaOpen, setModalAgendeAulaOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Função para alternar o estado de exibição da resposta
  const toggleFAQ = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Fecha a resposta se já estiver aberta
    } else {
      setActiveIndex(index); // Abre a resposta da pergunta clicada
    }
  };

  const faqData = [
    { question: "Qual é o valor da mensalidade?", answer: "A partir de R$99,90 por mês você pode ser aluno do Clube +, o clube onde o aluno paga menos por mês e tem 8 benefícios exclusivos, como, avaliação física grátis e 15 dias por mês para trazer um amigo para o treino. Mais informações na recepção das unidades." },
    { question: "Quais são os horários de funcionamento das unidades?", answer: "Nas unidades de Capela e Araçoiaba, o funcionamento é de segunda a sexta-feira, das 6h às 22h, e aos sábados, das 8h às 13h. <br/>Na unidade do Distrito do Porto, o horário é de segunda a sexta-feira, das 6h às 11h e das 15h às 21h, e aos sábados, das 8h às 12h." },
    { question: "Vocês aceitam Gympass ou Totalpass?", answer: "Temos parceria com o Totalpass. Mais informações na recepção da unidade." },
    { question: "Posso fazer uma aula experimental?", answer: "Sim, você pode fazer aula experimental para conhecer a academia ou aulas. Agende o seu dia na recepção." },
    { question: "As aulas estão inclusas na mensalidade.", answer: "Sim, as aulas fazem parte do seu treino e estão inclusas na sua mensalidade. Oferecemos aulas como circuito funcional, Jump, Zumba, GAP, Ritbox e muito mais. Consulte nossa grade de horários ou pelo whatsapp." },
    { question: "Posso transferir meu plano para outra pessoa?", answer: "Sim, permitimos a transferência de planos, mas este benefício está disponível apenas para o plano do Clube +. Consulte as condições na recepção." },
    { question: "Quem já foi aluno precisa pagar a taxa de matrícula novamente?", answer: "Depende do tempo de inatividade. Verifique as condições na recepção." },
    { question: "Quero marcar uma avaliação, como faço?", answer: "É fácil! Basta entrar em contato com a recepção ou agendar pelo aplicativo." },
    { question: "Qual é o benefício do Clube +?", answer: "Com o Clube +, você tem acesso a vantagens exclusivas como descontos em produtos e serviços. Consulte a recepção para mais detalhes." }
  ];

  const calendarAracoiaba = {
    headers: ["Horários", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    rows: [
      { time: "7h00", days: ["<strong>Alongamento</strong><br/>Lú Bianchi", "<strong>Pilates Solo</strong><br/>Sari", "<strong>Jump</strong><br/>Danilo", "<strong>Pilates Solo</strong><br/>Sari", "<strong>Jump</strong><br/>Danilo"] },
      { time: "8h00", days: ["<strong>Zumba</strong><br/>Lú Bianchi", "<strong>Pilates Solo</strong><br/>Sari", "<strong>Melhor Idade</strong><br/>Danilo", "<strong>Pilates Solo</strong><br/>Sari", "<strong>Melhor Idade</strong><br/>Danilo"] },
      { time: "18h00", days: ["<strong>Zumba</strong><br/>Lú Bianchi", "<strong>Circuito</strong><br/>Lú Bianchi", "<strong>GAP</strong><br/>Lú Bianchi", "", ""] },
      { time: "19h00", days: ["<strong>Ritmos</strong><br/>Preto", "", "<strong>Ritmos</strong><br/>Preto", "<strong>Jump</strong><br/>Danilo", "<strong>Zumba</strong><br/>Lú Bianchi"] },
    ],
  };

  const calendarCapela = {
    headers: ["Horários", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    rows: [
      { time: "7h00", days: ["<strong>Jump</strong><br/>Danilo", "<strong>Funcional</strong><br/>Duda", "<strong>Abdominal</strong><br/>Duda", "<strong>Jump</strong><br/>Lú Bianchi", ""] },
      { time: "8h00", days: ["<strong>Alongamento</strong><br/>Danilo", "", "", "", "<strong>Alongamento</strong><br/>Duda"] },
      { time: "18h00", days: ["", "", "", "<strong>Zumba</strong><br/>Lú Bianchi", ""] },
      { time: "19h00", days: ["<strong>Jump</strong><br/>Danilo", "<strong>Localizada</strong><br/>Danilo", "", "<strong>Abdominal</strong><br/>Íthalo", ""] },
    ],
  };


  useEffect(() => {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementsByClassName("close")[0];

    if (modal && btn && span) {
      btn.onclick = function () {
        modal.style.display = "block";
      };

      span.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.querySelector(".menu-burguer-expanded");
      const burgerIcon = document.querySelector(".menu-burguer");

      if (
        menu &&
        !menu.contains(event.target) &&
        burgerIcon &&
        !burgerIcon.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMenuOptionClick = () => {
    setMenuOpen(false);
  };

  // Função para detectar o sistema operacional
  const detectOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Detectar iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    // Detectar Android
    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // Caso seja PC ou outro sistema
    return "PC";
  };

  // Função que será chamada quando o botão for clicado
  const handleDownloadClick = () => {
    const os = detectOS();

    if (os === "iOS") {
      // Link para a App Store
      window.location.href = "https://apps.apple.com/br/app/sca-aluno/id1630928165";
    } else if (os === "Android") {
      // Link para o Google Play
      window.location.href = "https://play.google.com/store/search?q=sca+aluno&c=apps&hl=pt_BR";
    } else {
      // Ação para PC (podemos redirecionar para uma página ou mostrar uma mensagem)
      alert("Para baixar o aplicativo, visite nossa página oficial em seu dispositivo móvel!");
    }
  };

  //Tratamento para tirar elemento da renderização do github pages
  useEffect(() => {
    const unwantedElement = document.getElementById('loom-companion-mv3');
    if (unwantedElement) {
      unwantedElement.remove();
    }
  }, []);

  const ScheduleTable = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.time}</td>
              {row.days.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cell === "" ? "empty-cell" : ""}
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    );
  };

  function setEqualHeight() {
    const cards = document.querySelectorAll('.aula-descricao'); // Seleciona os cards
    let maxHeight = 0;

    // Reseta alturas e calcula a maior altura
    cards.forEach(card => {
      card.style.height = 'auto'; // Reseta para cálculo
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    // Aplica a maior altura a todos os cards
    cards.forEach(card => {
      card.style.height = `${maxHeight}px`;
    });
  }

  // Executa no carregamento e em redimensionamentos
  window.addEventListener('load', setEqualHeight);
  window.addEventListener('resize', setEqualHeight);



  const openModalPoliticaSeguranca = () => setModalPoliticaSeguranca(true);
  const closeModalPoliticaSeguranca = () => setModalPoliticaSeguranca(false);
  const openModalTermosServico = () => setModalTermosServico(true);
  const closeModalTermosServico = () => setModalTermosServico(false);
  const openModalConfiguracaoCookies = () => setModalConfiguracaoCookies(true);
  const closeModalConfiguracaoCookies = () => setModalConfiguracaoCookies(false);
  const openModalAgendeAulaOpen = () => setModalAgendeAulaOpen(true);
  const closeModalAgendeAulaOpen = () => setModalAgendeAulaOpen(false);

  return (
    <div className="App">
      <a
        href="https://wa.me/5515996879349?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <ImWhatsapp />
      </a>

      <nav className="menu">
        <img src="img/corpuswhite.png" alt="" style={{ height: "65px" }} />
        <ul>
          <li><a href="#nossas-unidades">Nossas Unidades</a></li>
          <li><a href="#aulas-e-treinos">Aulas e Treinos</a></li>
          <li><a href="#planos">Planos</a></li>
          {/*<li><a href="#lutas">Lutas</a></li> */}
          <li><a href="#aplicativo">Aplicativo</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#trabalhe-conosco">Trabalhe Conosco</a></li>
          <li><button onClick={() => setModalOpen(true)}>Contato</button></li>
        </ul>
      </nav>

      <div
        className="menu-burguer"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <img src="img/corpuswhite.png" alt="" style={{ height: "40px" }} />
        <LuMenu className="teste" />
      </div>
      {isMenuOpen && (
        <div className="menu-burguer-expanded">
          <ul>
            <li><a href="#" onClick={handleMenuOptionClick}>Início</a></li>
            <li><a href="#nossas-unidades" onClick={handleMenuOptionClick}>Nossas Unidades</a></li>
            <li><a href="#aulas-e-treinos" onClick={handleMenuOptionClick}>Aulas e Treinos</a></li>
            <li><a href="#planos" onClick={handleMenuOptionClick}>Planos</a></li>
            {/* <li><a href="#lutas" onClick={handleMenuOptionClick}>Lutas</a></li> */}
            <li><a href="#aplicativo" onClick={handleMenuOptionClick}>Aplicativo</a></li>
            <li><a href="#faq" onClick={handleMenuOptionClick}>FAQ</a></li>
            <li><a href="#trabalhe-conosco" onClick={handleMenuOptionClick}>Trabalhe Conosco</a></li>
            <li>
              <a
                href="https://wa.me/5515996879349?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImWhatsapp />
              </a>
            </li>          </ul>
        </div>
      )}


      <Slider className="slider-hero"{...heroSettings}>
        <div>
          <img
            src="img/banner-hero-1.png"
            alt="Imagem 1"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="img/banner-hero-2.png"
            alt="Imagem 2"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="img/banner-hero-3.png"
            alt="Imagem 3"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="img/banner-hero-4.png"
            alt="Imagem 3"
            className="carousel-image"
          />
        </div>
{/*         <div>
          <img
            src="img/banner-hero-5.png"
            alt="Imagem 3"
            className="carousel-image"
          />
        </div> */}
        <div>
          <img
            src="img/banner-hero-6.png"
            alt="Imagem 3"
            className="carousel-image"
          />
        </div>
      </Slider>

      <Slider className="slider-hero-mobile"{...heroSettings}>
        <div>
          <img
            src="img/banner-hero-mobile-1.png"
            alt="Imagem 1"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="img/banner-hero-mobile-2.png"
            alt="Imagem 2"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="img/banner-hero-mobile-3.png"
            alt="Imagem 3"
            className="carousel-image"
          />
        </div>
{/*         <div>
          <img
            src="img/banner-hero-mobile-4.png"
            alt="Imagem 4"
            className="carousel-image"
          />
        </div> */}
        <div>
          <img
            src="img/banner-hero-mobile-5.png"
            alt="Imagem 5"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="img/banner-hero-mobile-6.png"
            alt="Imagem 6"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="img/banner-hero-mobile-7.png"
            alt="Imagem 7"
            className="carousel-image"
          />
        </div>

      </Slider>

      {/* Banner Aula Grátis */}
      <section id="banner-aula-gratis">
        <div className="container">
          <img
            id="agende-sua-aula"
            src="img/agende-sua-aula.png"
            alt="Faixa com a imagem 'Agende sua aula grátis'"
          />
          <button onClick={openModalAgendeAulaOpen}>Agende Agora</button>
        </div>
      </section>

      {/* Conheça Nossas Unidades */}
      <section id="nossas-unidades">
        <div className="unidades">
          <h2>Conheça Nossas Unidades</h2>
          <p>Encontre a unidade mais próxima de você e aproveite um ambiente feito para alcançar seus objetivos.</p>

          <div className="card-container">
            {/* Card 1: Araçoiaba da Serra */}
            <div className="card">
              <img src="img/fachada-aracoiaba.png" alt="Araçoiaba da Serra" className="card-image" />
              <div className="card-content">
                <h3> Araçoiaba da Serra </h3>
                <p><ImLocation /> Av. Ângelo Pupin, 158 <br /> Jardim Primavera</p>
                <a
                  href="https://wa.me/5515997580128?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                  className="cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImWhatsapp /> (15) 9.9758-0128
                </a>
              </div>
            </div>

            {/* Card 2: Capela do Alto */}
            <div className="card">
              <img src="img/fachada-capela.png" alt="Capela do Alto" className="card-image" />
              <div className="card-content">
                <h3> Capela do Alto </h3>
                <p><ImLocation /> R. João Felipe, 125 <br /> Centro</p>
                <a
                  href="https://wa.me/5515991969092?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                  className="cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImWhatsapp /> (15) 9.9196-9092
                </a>
              </div>
            </div>

            {/* Card 3: Distrito do Porto */}
            <div className="card">
              <img src="img/fachada-porto.png" alt="Distrito do Porto" className="card-image" />
              <div className="card-content">
                <h3> Distrito do Porto </h3>
                <p><ImLocation /> Av. Bom Jesus, 41 <br /> Distrito do Porto</p>
                <a
                  href="https://wa.me/5515998886915?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                  className="cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImWhatsapp /> (15) 9.9888-6915
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aulas e Treinos */}
      <section id="aulas-e-treinos">
        <div className="aulas">
          <h2>Aulas Aeróbicas</h2>
          <p>Queime muitas calorias e turbine o cardio incluindo aulas no seu treino.</p>


          {/* Slider de Cards */}

          <Slider {...cardSettings} className="card-slider">
            {aulas.map((aula) => (
              <CardAula
                key={aula.id}
                titulo={aula.titulo}
                imagem={aula.imagem}
                descricao={aula.descricao}
                duracao={aula.duracao}
                nivel={aula.intensidade.nivel}
                calorias={aula.intensidade.calorias}
              />
            ))}
          </Slider>
        </div>
      </section>

      {/*             <img src="img/background.png" alt="" className="bkg-calendario" />
 */}

      <section id="calendarios" style={{
        backgroundImage: "url('/img/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>

        <div className="calendarios">
          <div class="calendario">
{/*             <h2>ARAÇOIABA DA SERRA</h2>
 */}            <div class="calendario-wrapper">
              <img src="img/grade_aracoiaba.png" alt="Calendário de aulas da unidade de Araçoiaba da Serra" class="moldura-aracoiaba" />

              {/* <ScheduleTable data={calendarAracoiaba} className="teste" /> */}
            </div>
          </div>
          <div class="calendario">
{/*             <h2>CAPELA DO ALTO</h2>
 */}            <div class="calendario-wrapper">
              {/*               <img src="img/personagem-calendario2.png" alt="" className="personagem-calendario2" />
 */}              <img src="img/grade_capela.png" alt="Calendário de aulas da unidade de Capela do Alto" class="moldura-aracoiaba" />
              {/* <ScheduleTable data={calendarCapela} /> */}
            </div>
          </div>
          {/*           <img src="img/a-sua-academia.png" alt="" style={{ height: "60px" }} />
 */}        </div>

      </section>

      {/* Planos */}
      <section id="planos">
        <div className="planos">
          <h2>Escolha o seu plano</h2>
          <p>Comece hoje e encontre o melhor em você todos os dias.</p>
          <p>A Corpus é a sua Academia e Academia é vida!</p>
          <div className="planos-container">

            <div className="plano-card">
              <h3>Passaporte</h3>
              <a
                href="https://wa.me/5515996879349?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                target="_blank"
                rel="noopener noreferrer"
                className="matricula"
              >
                Matricule-se Agora
              </a>
              <ul className="checklist">
                <li><span className="check">✔</span>Musculação </li>
                <li><span className="check">✔</span>Aulas Aeróbicas Ilimitadas</li>
                <li><span className="check">✔</span>Dias e horários livres</li>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </ul>
              <div className="planos-preco">
                <p>A partir de</p>
                <p className="preco">R$ 149,90</p>
                <p>Plano 30 dias</p>
                <p className="small">Verifique as condições</p>
              </div>
            </div>

            <div className="plano-card">
              <h3>Prata</h3>
              <a
                href="https://wa.me/5515996879349?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                target="_blank"
                rel="noopener noreferrer"
                className="matricula"
              >
                Matricule-se Agora
              </a>
              <ul className="checklist">
                <li><span className="check">✔</span>Musculação </li>
                <li><span className="check">✔</span>Aulas Aeróbicas Ilimitadas</li>
                <li><span className="check">✔</span>Dias e horários livres</li>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </ul>
              <div className="planos-preco">
                <p>A partir de</p>
                <p className="preco">R$ 129,90</p>
                <p>Plano 6 meses</p>
                <p className="small">Verifique as condições</p>
              </div>
            </div>

            <div className="plano-card melhor-escolha">
              <div className="melhor-escolha-texto">Melhor Escolha</div>
              <h3><img src="img/clube+.png" alt="logotipo clube mais" className="logo-clube" /></h3>
              <a
                href="https://wa.me/5515996879349?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                target="_blank"
                rel="noopener noreferrer"
                className="matricula"
              >
                Matricule-se Agora
              </a>
              <ul className="checklist">
                <li>Tudo do Plano Prata mais:</li>
                <li><span className="check">✔</span>Isenção de taxa de matricula</li>
                <li><span className="check">✔</span>Primeira avaliação física grátis</li>
                <li><span className="check">✔</span>60 dias Flexíveis no ano</li>
                <li><span className="check">✔</span>Traga 2 amigos por mês</li>
                <li><span className="check">✔</span>Treine em 3 unidades</li>
                <li><span className="check">✔</span>Transferência de plano permitida</li>
                <li><span className="check">✔</span>Desconto e benefícios exclusivos em suplementos e vestuário</li>
              </ul>
              <div className="planos-preco">
                <p>A partir de</p>
                <p className="preco">R$ 99,90</p>
                <p>Plano 12 meses</p>
                <p className="small">Verifique as condições</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Aplicativo */}
      <section id="aplicativo" className="app-section" >
        <div className="app-info">
          <h2 className="app-title">Aplicativo do Aluno</h2>
          <div className="app-content">
            <div className="app-text">
              <h3 className="app-subtitle">Corpus App:<br /> Treinos e Resultados na Palma da Mão!</h3>
              <img src="img/app.png" alt="Imagem do APP" className="app-image-mobile" />

              <p className="app-details">
                Com o Corpus App, você tem todo o suporte que precisa para alcançar suas metas de forma prática e eficiente:
              </p>
              <ul className="app-features">
                <li>Acompanhe seu treino personalizado</li>
                <li>Veja vídeos demonstrativos dos exercícios</li>
                <li>Monitore o progresso das suas cargas e desempenho</li>
                <li>Acesse a nossa agenda de aulas e novidades</li>
                <li>Faça upgrades de plano ou renovações direto pelo app</li>
              </ul>
              <p className="app-call-to-action">
                Tudo isso sem custo adicional! Baixe agora o Corpus App e tenha a experiência completa da Corpus sempre com você!
              </p>
            </div>
            <img src="img/app.png" alt="Imagem do APP" className="app-image" />
          </div>
      <button className="app-button" onClick={handleDownloadClick} disabled={false}>Baixar Aplicativo</button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="faq">
          <h2>Perguntas Frequentes (FAQ)</h2>
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question-container" onClick={() => toggleFAQ(index)}>
                <h4 className="faq-question">
                  {faq.question}
                </h4>
                <span className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`}>
                  <FaAngleDown />
                </span>
              </div>
              {activeIndex === index && (
                <p
                  className="faq-answer"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              )}
              <hr className="faq-divider" /> {/* Linha divisória */}
            </div>
          ))}
        </div>
      </section>

      {/* Trabalhe Conosco */}
      <section id="trabalhe-conosco" className="trabalhe-conosco">
        <div className="container">
          <div className="conteudo">
            <div className="beneficios">
              <h2 className="titulo">Trabalhe Conosco</h2>
              <p className="descricao">
                Junte-se à nossa equipe e faça parte de um ambiente colaborativo onde você pode crescer e desenvolver suas habilidades.
              </p>

              <div className="beneficio">
                <h3>Ambiente Inovador</h3>
                <p>Trabalhe com as últimas tecnologias e participe de projetos desafiadores.</p>
              </div>
              <div className="beneficio">
                <h3>Crescimento de Carreira</h3>
                <p>Planos de carreira estruturados e oportunidades para você se desenvolver dentro da empresa.</p>
              </div>
              <div className="beneficio">
                <h3>Cultura Inclusiva</h3>
                <p>Um ambiente de trabalho diverso e acolhedor, onde todos são valorizados.</p>
              </div>

              <div>
                <a href="mailto:contato@corpusacademias.com.br?subject=Candidatura&body=Olá, gostaria de enviar meu currículo para a vaga." className="botao-candidatura">
                  Envie seu Currículo
                </a>
              </div>

            </div>

            <div className="imagem-trabalhe-conosco">
              <img src="img/trabalhe-conosco.png" alt="Equipe de trabalho" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer">
          <img src="img/corpusorange.png" alt="Jump" className="logo-image" />
          <div className="footer-columns">

            <div className="footer-menu">
              <ul>
                <li><a href="slider">Início</a></li>
                <li><a href="#nossas-unidades">Unidades</a></li>
                <li><a href="#aulas-e-treinos">Aulas e Treinos</a></li>
                <li><a href="#aplicativo">Aplicativo</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#trabalhe-conosco">Trabalhe Conosco</a></li>
              </ul>
            </div>

            <div className="footer-location">
              <div className="location">
                <strong>Araçoiaba da Serra</strong>
                <p>Av. Ângelo Pupin, 158</p>
                <p>Seg a Sex: 6h às 22h<br />Sáb: 8h às 13h</p>
                <a href="https://wa.me/5515997580128?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!" className="cta-button" target="_blank" rel="noopener noreferrer"><ImWhatsapp /> (15) 9.9758-0128</a>
              </div>
              <div className="location">
                <strong>Capela do Alto</strong>
                <p>R. João Felipe, 125</p>
                <p>Seg a Sex: 6h às 22h<br />Sáb: 8h às 13h</p>
                <a href="https://wa.me/5515991969092?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!" className="cta-button" target="_blank" rel="noopener noreferrer"><ImWhatsapp /> (15) 9.9196-9092</a>
              </div>
              <div className="location">
                <strong>Distrito do Porto</strong>
                <p>Av. Bom Jesus, 41</p>
                <p>Seg a Sex: 6h às 11h e 15h às 21h<br />Sáb: 8h às 12h</p>
                <a href="https://wa.me/5515998886915?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!" className="cta-button" target="_blank" rel="noopener noreferrer"><ImWhatsapp /> (15) 9.9888-6915</a>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="footer-socials">
            <a href="https://www.facebook.com/Corpusacademias" target="_blank" rel="noopener noreferrer" className="social-button"><FaFacebookSquare /></a>
            <a href="https://www.instagram.com/corpusacademias/" target="_blank" rel="noopener noreferrer" className="social-button"><FaInstagram /></a>
            <a href="mailto:contato@corpusacademias.com.br" target="_blank" rel="noopener noreferrer" className="social-button"><CiMail /></a>
          </div>

          {/* Legal Footer */}
          <div class="legal-footer">
            <p>© 2024 Academia Corpus. Todos os direitos reservados. Desenvolvido por <a href="https://starck.dev.br" target="_blank" rel="noopener noreferrer">starck.dev</a></p>
            <button onClick={openModalPoliticaSeguranca} className="termos-button">Políticas de Segurança</button>
            <button onClick={openModalTermosServico} className="termos-button">Termos de Serviço</button>
            <button onClick={openModalConfiguracaoCookies} className="termos-button">Configurações de cookies</button>
          </div>
        </div>
      </footer>

      {/* Modal de Contato */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content-contato" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setModalOpen(false)}>&times;</button>
            <h2>Contato</h2>
            <hr className="faq-divider" /> {/* Linha divisória */}

            <div className="contact-locations">
              <div className="contact-location">
                <strong>Araçoiaba da Serra</strong>
                <p>Seg a Sex: 6h às 22h<br />Sáb: 8h às 13h</p>
                <a
                  href="https://wa.me/5515997580128?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                  className="cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImWhatsapp /> (15) 9.9758-0128
                </a>
              </div>
              <div className="contact-location">
                <strong>Capela do Alto</strong>
                <p>Seg a Sex: 6h às 22h<br />Sáb: 8h às 13h</p>
                <a
                  href="https://wa.me/5515991969092?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                  className="cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImWhatsapp /> (15) 9.9196-9092
                </a>
              </div>
              <div className="contact-location">
                <strong>Distrito do Porto</strong>
                <p>Seg a Sex: 6h às 11h e 15h às 21h<br />Sáb: 8h às 12h</p>
                <a
                  href="https://wa.me/5515998886915?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                  className="cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImWhatsapp /> (15) 9.9888-6915
                </a>
              </div>
            </div>
            <p><strong>Email:</strong> contato@academiacorpus.com</p>
          </div>
        </div>
      )}

      {/* Modal Agende uma Aula */}
      {isModalAgendeAulaOpen && (
        <div className="modal-overlay" onClick={closeModalAgendeAulaOpen}>
          <div className="modal-content-schedule" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-schedule">
              <h2>Escolha uma Unidade</h2>
              <span className="modal-close-button" onClick={closeModalAgendeAulaOpen}>&times;</span>
            </div>
            <div className="modal-buttons-schedule">
              <a
                href="https://wa.me/5515997580128?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                className="schedule-modal-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImWhatsapp /> Araçoiaba da Serra
              </a>
              <a
                href="https://wa.me/5515991969092?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                className="schedule-modal-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImWhatsapp /> Capela do Alto
              </a>
              <a
                href="https://wa.me/5515998886915?text=Olá,%20eu%20vim%20do%20site%20da%20Corpus%20Academias%20e%20gostaria%20de%20mais%20informações!"
                className="schedule-modal-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImWhatsapp /> Distrito do Porto
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Políticas de Segurança */}
      {isModalPoliticaSeguranca && (
        <div className="modal-overlay" onClick={closeModalPoliticaSeguranca}>
          <div className="modal-content-termos" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModalPoliticaSeguranca}>&times;</button>

            <h2>Políticas de Segurança</h2>
            <p>
              Sua segurança é nossa prioridade. Utilizamos SSL e HTTPS para proteger
              as informações transmitidas entre seu navegador e nosso site. Isso garante
              que os dados sejam criptografados e permaneçam seguros durante a comunicação.
            </p>
            <p>
              Este site não coleta nem armazena nenhum tipo de dados pessoais. Todos os
              botões disponíveis redirecionam os usuários para o WhatsApp, Instagram e
              Facebook, ou para o e-mail da empresa, sem armazenar informações adicionais.
            </p>
          </div>
        </div>
      )}

      {/* Modal para Termos de Serviço */}
      {isModalTermosServico && (
        <div className="modal-overlay" onClick={closeModalTermosServico}>
          <div className="modal-content-termos" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModalTermosServico}>&times;</button>

            <h2>Termos de Serviço</h2>
            <p>
              Os serviços oferecidos por nossa empresa são realizados em local físico,
              com um contrato de prestação de serviço que garante qualidade e segurança para você.
              Este site é apenas uma landing page e não realiza qualquer tipo de serviço ou coleta de dados.
            </p>
            <p>
              Ao navegar em nossa página, você é redirecionado para canais oficiais como
              WhatsApp, redes sociais e e-mail, onde poderá contatar a equipe diretamente para informações.
              Não nos responsabilizamos por qualquer conteúdo fora dos nossos links oficiais.
            </p>
          </div>
        </div>
      )}

      {/* Modal de Configurações de Cookies */}
      {isModalConfiguracaoCookies && (
        <div className="modal-overlay" onClick={closeModalConfiguracaoCookies}>
          <div className="modal-content-termos" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModalConfiguracaoCookies}>&times;</button>

            <h2>Configurações de Cookies</h2>
            <p>Atualmente, não utilizamos cookies em nosso site. Nenhum dado de navegação é coletado ou armazenado.</p>

            <p>Para mais informações sobre como gerenciamos dados, consulte nossa <a href="#politica-seguranca" onClick={openModalPoliticaSeguranca}>Política de Segurança</a>.</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
