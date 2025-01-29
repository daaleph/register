type HookEntry = [string, string, string]; // Tuple type for the hook arrays

interface HooksDictionary {
  [key: string]: HookEntry;
}

const hooks: HooksDictionary = {
  "estudiar": [
    "Nos dijeron: 'Estudia. Estudia más. Estudia otra vez.' Nos lo dijeron durante años, pero el caos sigue ahí.",
    "Quiero la solución",
    "Ahora imagina si esos mismos momentos de confusión se convirtieran en tu trampolín hacia un dominio imparable. Nuestro enfoque basado en IA aprovecha la ironía de la confusión misma, transformándola en tu mayor ventaja a través de la repetición espaciada y estímulos psicológicos significativos."
  ],
  "resaltar": [
    "Resalta, resalta, resalta… y olvida.",
    "Necesito cambiar esto",
    "Es el cruel truco que tu mente ha estado jugando durante décadas. Pero aquí viene un giro inesperado: nuestro sistema de repetición espaciada impulsado por IA te reta a hacer lo impensable: saltarte el subrayado disparando la retención. Advertencia: los efectos secundarios pueden incluir una claridad sin precedentes y una sed insaciable de conocimiento real."
  ],
  "memorizar": [
    "Felicidades, has estado memorizando a toda prisa… hacia el olvido.",
    "Muéstrame cómo",
    "Sí, leíste bien. El viejo método de acumular información en tu cerebro de una sola vez sabotea tu memoria. Nuestra solución cambia las reglas del juego: sesiones de lectura de 15 minutos, comprobaciones psicológicas de significado y cuestionarios espaciados que transforman tus caóticas 'sesiones de pánico' en pilares de calma y dominio."
  ],
  "aprendizaje": [
    "Dijeron que aprender debe ser tranquilo y cómodo… Mintieron.",
    "Quiero saber más",
    "El verdadero crecimiento mental prospera en la tensión saludable: la tensión del significado. Nuestra plataforma Aleph despierta esa tensión preguntándote: '¿Por qué importa esto? ¿Quién se beneficiará si dominas esto?' Prepárate para que tu complacencia desaparezca y tu propósito se encienda."
  ],
  "aburrimiento": [
    "El aburrimiento es el enemigo, así que conviértelo en tu aliado.",
    "Descubrir el método",
    "Insertamos metáforas, motivación externa para despertar la interna y retroalimentación en tiempo real, transformando tus aburridas sesiones de lectura en breves y emocionantes 'misiones'. Si crees que aprender no puede ser revelador, es porque no has sentido el impacto consciente de nuestro nuevo método."
  ],
  "retencion": [
    "¿Sientes que tras leer cinco páginas no recuerdas la mayoría de las cosas?",
    "Quiero la técnica",
    "Prepárate: esa impotencia puede ser tu mayor arma. Allí se esconde la oportunidad perfecta para reciclar conocimientos, recordarlos en cuestionarios en miniatura y almacenarlos, aumentando tu creativida basada de memoria de largo plazo."
  ],
  "proposito": [
    "Dijeron que todo se trata de aprobar el examen o un proyecto universitario… pero ese es el verdadero peligro.",
    "Necesito entender más",
    "Nuestro sistema te desafía a encontrar un significado genuino en cada sesión, aprovechando enseñanzas filosóficas y de superación personal para convertir tu conocimiento fugaz en sabiduría duradera para la vida. ¿El resultado? No solo apruebas exámenes, sino que superas tus propios límites creativos."
  ],
  "miedo": [
    "¿Quieres silenciar la temida voz de 'Voy a fallar'? Sorpréndela con intención paradójica.",
    "Muéstrame el camino",
    "Integramos toques de psicología analítica y filosofías, instruyéndote a 'intentar olvidar', solo para ver cómo tu memoria se aferra al material con más fuerza. La ironía es poderosa desmantela viejas ansiedades."
  ],
  "acumulacion": [
    "Deja de acumular conocimiento que no usas.",
    "Quiero la alternativa",
    "Espaciando tu práctica, recordando activamente y mapeándolo todo con nuestro astuto Bot de Análisis de PDFs, eliminas el desorden mental. Es como esa última pieza del rompecabezas que encaja perfectamente, solo que sigue ocurriendo con cada tema que alimentas a nuestros algoritmos."
  ],
  "control": [
    "¿Crees que lo tienes todo bajo control releyendo? Atrévete a descubrir lo contrario.",
    "Descubrir más",
    "Nuestra plataforma revela cómo la relectura por sí sola puede ser una cinta de correr ilusoria. Rompemos ese ciclo con cuestionarios curados, mapas mentales e intervalos espaciados, llevándote al dulce impacto de superar tus propias expectativas."
  ],
  "objetivos": [
    "Has estado persiguiendo tus objetivos como un hámster en una rueda.",
    "Quiero la solución",
    "Pero, ¿y si la rueda dejara de girar y para atraerlos tus sueños a tí? Prepárate: esto no es lo que te han enseñado, pero es exactamente lo que necesitas."
  ],
  "recordar": [
    "Cuanto más intentas recordar, más rápido olvidas.",
    "Necesito ayuda",
    "No es tu culpa, es la cruel broma de tu cerebro. Pero, ¿y si olvidar se convirtiera en el arma secreta para recordarlo todo? La respuesta está en los espacios que has estado ignorando."
  ],
  "enfoque": [
    "Has estado resolviendo el problema equivocado todo este tiempo.",
    "Quiero entender",
    "No se trata de cuánto estudias, sino de cuánto no lo haces. Cuanto menos acumules, más retendrás. ¿Suena absurdo? Es porque lo es."
  ],
  "distraccion": [
    "Te han dicho que te concentres más, pero ¿y si la distracción es la clave?",
    "Dime más",
    "Tu cerebro anhela novedad, no monotonía. El secreto no está en luchar contra el caos, sino en usarlo a tu favor."
  ],
  "sistema": [
    "No eres perezoso, solo estás atrapado en un sistema roto.",
    "Quiero escapar",
    "El problema no eres tú. Son los métodos obsoletos que te han obligado a seguir. Pero hay una salida, y es más simple de lo que crees."
  ],
  "concentracion": [
    "Has estado leyendo la misma frase una y otra vez, ¿verdad?",
    "Necesito cambiar",
    "Eso no es falta de concentración, es falta de técnica y significado. ¿Y si cada lectura que leyeras sintieras que importara? Imagina la diferencia."
  ],
  "velocidad": [
    "Has estado intentando aprender más rápido, pero ¿y si la respuesta fuera ir más lento?",
    "Quiero aprender",
    "La carrera por acumular más información es un juego perdido. Los verdaderos ganadores son los que saben cuándo detenerse."
  ],
  "debilidades": [
    "Has estado intentando superar tus debilidades, pero ¿y si fueran tu mayor fortaleza?",
    "Muéstrame cómo",
    "Los defectos en tu proceso de aprendizaje no son obstáculos, son oportunidades. Solo necesitas saber cómo usarlos."
  ],
  "trabajo": [
    "Te han dicho que trabajes más duro, pero ¿y si trabajar de forma más inteligente no fuera suficiente?",
    "Quiero saber más",
    "El verdadero secreto no está en trabajar más duro ni más inteligentemente, sino en trabajar de manera diferente. Y todo comienza rompiendo las reglas que has estado siguiendo."
  ],
  "reglas": [
    "Te han dicho que sigas las reglas, pero ¿y si las reglas son el problema?",
    "Quiero liberarme",
    "Los mayores avances surgen al liberarte de los sistemas que te frenan. ¿Estás listo para reescribir el guion?"
  ],
  "confusion": [
    "Has estado persiguiendo la claridad, pero ¿y si la confusión es la clave?",
    "Descubrir más",
    "En el caos de no saber se encuentra la chispa del descubrimiento. La pregunta es: ¿la aceptarás?"
  ],
  "perfeccion": [
    "Te han dicho que busques la perfección, pero ¿y si la imperfección es tu superpoder?",
    "Quiero entender",
    "Las grietas en tu proceso no son defectos, son las aberturas donde comienza el verdadero crecimiento."
  ],
  "cantidad": [
    "Has estado intentando aprender todo, pero ¿y si aprender menos es la respuesta?",
    "Dime el secreto",
    "El secreto no está en saberlo todo, sino en saber qué es lo que realmente importa."
  ],
  "oportunidad": [
    "Te han dicho que te mantengas en tu carril, pero ¿y si la verdadera oportunidad está fuera del camino conocido?",
    "Quiero explorar",
    "El conocimiento más valioso a menudo se encuentra donde nadie más está buscando."
  ],
  "presente": [
    "Te han dicho que te enfoques en el futuro, pero ¿y si el presente es todo lo que necesitas?",
    "Muéstrame cómo",
    "El poder para transformar tu aprendizaje está en los momentos que estás pasando por alto ahora mismo."
  ],
  "fracaso": [
    "Te han dicho que evites el fracaso, pero ¿y si el fracaso es el único camino hacia adelante?",
    "Quiero entender",
    "Cada error es un paso más cerca de la maestría, si sabes cómo aprovecharlo."
  ],
  "eficiencia": [
    "Te han dicho que trabajes más duro, pero ¿y si trabajar menos es el secreto?",
    "Dime más",
    "Los aprendices más efectivos no se agotan, construyen sistemas que hacen el trabajo por ellos."
  ],
  "proceso": [
    "Te han dicho que confíes en el proceso, pero ¿y si el proceso está roto?",
    "Quiero cambiar",
    "Es hora de dejar de seguir y empezar a crear un sistema que funcione para ti."
  ],
  "limites": [
    "Te han dicho que pienses fuera de la caja, pero ¿y si la caja no existe?",
    "Quiero descubrir",
    "Los límites que ves son ilusiones. La verdadera pregunta es: ¿hasta dónde estás dispuesto a llegar?"
  ],
  "potencial": [
    "Desbloquea tu potencial. Conquista tus desafíos. Domina tus estudios.",
    "Quiero empezar",
    "Nuestra plataforma de aprendizaje impulsada por IA está aquí para ayudarte."
  ],
  "esfuerzo": [
    "Olvida el estudio interminable. Abraza el aprendizaje sin esfuerzo.",
    "Muéstrame cómo",
    "Descubre un enfoque revolucionario para adquirir conocimiento."
  ],
  "comprension": [
    "Deja atrás el frenesí de subrayar. Desbloquea una comprensión real.",
    "Quiero aprender",
    "Nuestro sistema transforma la forma en que aprendes, para siempre."
  ],
  "memoria": [
    "¿Cansado de olvidar? Prepárate para recordar.",
    "Necesito ayuda",
    "Experimenta el poder de la práctica de recuperación."
  ],
  "progreso": [
    "Deja de luchar. Empieza a prosperar.",
    "Quiero avanzar",
    "Nuestra plataforma impulsada por IA hace que aprender sea atractivo y efectivo."
  ],
  "exito": [
    "Reimagina el aprendizaje. Redefine el éxito.",
    "Quiero más",
    "Nuestro enfoque innovador te empodera para alcanzar tus metas."
  ],
  "viaje": [
    "Aprender no debería ser una tarea. Debería ser un viaje.",
    "Quiero comenzar",
    "Únete a nosotros en el camino hacia la maestría."
  ],
  "dominio": [
    "Supera a tu cerebro. Domina cualquier tema.",
    "Quiero dominar",
    "Nuestra plataforma utiliza IA de vanguardia para un aprendizaje óptimo."
  ],
  "transformacion": [
    "Transforma tus hábitos de estudio. Transforma tu vida.",
    "Quiero transformarme",
    "Experimenta la diferencia de Aleph."
  ],
  "entendimiento": [
    "Más allá de la memorización. Hacia una verdadera comprensión.",
    "Quiero entender",
    "Nuestro sistema fomenta una comprensión profunda y una retención duradera."
  ],
  "instintos": [
    "Te han dicho que confíes en tus instintos, pero ¿y si tus instintos están saboteando tu éxito?",
    "Necesito saber",
    "La verdad sobre el aprendizaje podría ser lo opuesto a lo que siempre has creído."
  ],
  "preguntas": [
    "Has estado persiguiendo respuestas, pero ¿y si las preguntas son más poderosas?",
    "Quiero descubrir",
    "La pregunta correcta puede desbloquear más de lo que mil respuestas podrían."
  ],
  "detalles": [
    "Te han dicho que te enfoques en los detalles, pero ¿y si estás perdiendo de vista el panorama general?",
    "Muéstrame más",
    "A veces, las distracciones más pequeñas esconden las mayores oportunidades."
  ],
  "errores": [
    "Te han dicho que evites los errores, pero ¿y si los errores son el único camino hacia adelante?",
    "Quiero aprender",
    "Cada error es un paso más cerca de la maestría, si sabes cómo aprovecharlo."
  ],
  "constancia": [
    "Te han dicho que seas constante, pero ¿y si la inconsistencia es la clave del crecimiento?",
    "Dime más",
    "Romper el ritmo podría ser el avance que has estado esperando."
  ],
  "simplicidad": [
    "Te han dicho que simplifiques, pero ¿y si la complejidad es donde ocurre la magia?",
    "Quiero entender",
    "Las capas que evitas podrían contener las respuestas que buscas."
  ],
  "libertad": [
    "Te han dicho que mantengas el control, pero ¿y si soltarlo es la única forma de ganar?",
    "Quiero liberarme",
    "A veces, rendirse al proceso es el movimiento más poderoso que puedes hacer."
  ]
};

export default hooks;