// frontend/src/pages/index.tsx
import styles from '@/styles/landing.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {

  return (
    <>
      <Head>
        <title>Aleph Space - Educación Eficiente</title>
        <meta name="title" content="Aleph Space" />
        <meta name="keywords" content="Aleph Space, Educación eficiente, Aprendizaje eficiente, Aprendizaje personalizado, Educacion eficiente" />
        <meta name="description" content="Educación eficiente y personalizada elevando tu vida con simples clics: Increasing universal wisdom - Where eternity tends to converge" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aleph-space.org/" />
        <meta property="og:title" content="Aleph Space" />
        <meta property="og:description" content="Educación eficiente y personalizada elevando tu vida con simples clics: Increasing universal wisdom - Where eternity tends to converge" />
        <meta property="twitter:url" content="https://aleph-space.org/" />
        <meta property="twitter:title" content="Aleph Space" />
        <meta property="twitter:description" content="Educación eficiente y personalizada elevando tu vida con simples clics: Increasing universal wisdom - Where eternity tends to converge" />
      </Head>
      
      <div className={styles.landingContainer}>
        <section className={styles.heroSection}>
          <h1 className={styles.heroQuestion}>
            ¿Con simples clics tu vida elevarías?
          </h1>
          <h2 className={styles.subHeroQuestion}>
            ¿Y si ese poder estuviera en tus manos, pero aún no lo sabes?
          </h2>
        </section>

        <section className={styles.characterSection}>
          <div className={styles.characterCard}>
            <h3 className={styles.gothicText}>Tú</h3>
            <p className={styles.calmText}>
              Eres alguien que quiere más. <b>Más</b> para tu <b>familia</b>, más para tu <b>futuro</b>, más para el <b>mundo</b>. 
              Pero a veces, el camino parece imposible sin aprendizaje eficiente.
            </p>
          </div>

          <div className={styles.characterCard}>
            <h3 className={styles.gothicText}>Nosotros</h3>
            <p className={styles.calmText}>
              Liberaremos tu <b>potencial</b> garantizadamente ayudándote a crecer con <b>menos esfuerzo</b> convertiendo tus sueños en realidades tangibles si y solo si sigues nuestros <b>algoritmos verificados</b> de educación eficiente.
            </p>
          </div>
        </section>

        <section className={styles.obstaclesSection}>
          <div className={styles.obstaclesList}>
            <div className={styles.obstacle}>
              <span className={styles.obstacleIcon}>⚠</span>
              <p>¿<b>Frustración</b> por incapacidad de cumplir sueños?</p>
            </div>
            <div className={styles.obstacle}>
              <span className={styles.obstacleIcon}>⏳</span>
              <p>El <b>tiempo</b> que parece nunca alcanzar</p>
            </div>
            <div className={styles.obstacle}>
              <span className={styles.obstacleIcon}>❓</span>
              <p>La <b>incertidumbre</b> que te paraliza</p>
            </div>
          </div>
        </section>

        <section className={styles.visionSection}>
          <p className={styles.visionText}>
            Imagina tus pasos <b>impactando mejor</b> el presente y <b>a tí</b>. 
            <b> Menos esfuerzo</b> impactando a quienes amas y al mundo entero.
            Siguiendo caminos claros, <b>garantizados</b> placenteros con aprendizaje personalizado.
          </p>
        </section>

        <section className={styles.solutionSection}>
          <h3 className={styles.calmText} style={{marginBottom: '1rem'}}>Simplifica el proceso</h3>
          <div className={styles.solutionFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎯</span>
              <p>Descubre tu perfil psicológico</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📊</span>
              <p>Recibe material, resultados y feedback personalizados</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✨</span>
              <p>Transforma tu vida con métodos científicamente probados</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <p className={styles.ctaText}>
            No se trata solo de aprender. Se trata de crecer. De impactar. 
            De encontrar el significado que siempre buscaste.
          </p>
          <Link href="/register">
            <button className={styles.submitButton}>
              Descubre tu potencial ahora
            </button>
          </Link>
        </section>
      </div>
    </>
  );
}