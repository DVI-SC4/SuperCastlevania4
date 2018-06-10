# Super Castlevania IV
Proyecto final de la asignatura Desarrollo de Videojuegos mediante Tecnologías Web de la Universidad Complutense de Madrid.

# Índice

* [1. Diseño del juego](https://github.com/DVI-SC4/SuperCastlevania4#1-dise%C3%B1o-del-juego)
	* [1.1. Sobre el juego original](https://github.com/DVI-SC4/SuperCastlevania4#11-sobre-el-juego-original)
	* [1.2. Objetivo del juego](https://github.com/DVI-SC4/SuperCastlevania4#12-objetivo-del-juego) 
	* [1.3. Principales mecánicas](https://github.com/DVI-SC4/SuperCastlevania4#13-principales-mec%C3%A1nicas)
		* [Simon](https://github.com/DVI-SC4/SuperCastlevania4#1-simon)
			* [Avance y retroceso](https://github.com/DVI-SC4/SuperCastlevania4#11-avance-y-retroceso)
			* [Agacharse](https://github.com/DVI-SC4/SuperCastlevania4#12-agacharse)
			* [Salto](https://github.com/DVI-SC4/SuperCastlevania4#13-salto)
			* [Subir y bajar escaleras](https://github.com/DVI-SC4/SuperCastlevania4#14-subir-y-bajar-escaleras)
			* [Ataque](https://github.com/DVI-SC4/SuperCastlevania4#15-ataque)
				*  [Ataques desde el suelo](https://github.com/DVI-SC4/SuperCastlevania4#151-ataques-desde-el-suelo)
				*  [Ataques en el aire](https://github.com/DVI-SC4/SuperCastlevania4#152-ataques-en-el-aire)
		* [Enemigos](https://github.com/DVI-SC4/SuperCastlevania4#2-enemigos)
			* [Esqueleto](https://github.com/DVI-SC4/SuperCastlevania4#21-esqueleto)
			* [Murcielago](https://github.com/DVI-SC4/SuperCastlevania4#22-murcielago)
		* [Jefe final](https://github.com/DVI-SC4/SuperCastlevania4#3-jefe-final)
		* [HUD](https://github.com/DVI-SC4/SuperCastlevania4#4-hud)
		* [Velas](https://github.com/DVI-SC4/SuperCastlevania4#5-velas)
	* [1.4. Personajes](https://github.com/DVI-SC4/SuperCastlevania4#14-personajes)
* [2. Diseño de la implementación](https://github.com/DVI-SC4/SuperCastlevania4#2-dise%C3%B1o-de-la-implementaci%C3%B3n)
	* [2.1. Arquitectura y jerarquía de archivos](https://github.com/DVI-SC4/SuperCastlevania4#21-arquitectura-y-jerarqu%C3%ADa-de-archivos)
	* [2.2. Principales componentes](https://github.com/DVI-SC4/SuperCastlevania4#22-principales-componentes)
	* [2.3. Implementaciones realizadas](https://github.com/DVI-SC4/SuperCastlevania4#23-implementaciones-realizadas)
* [3. Equipo de trabajo y reparto de tareas](https://github.com/DVI-SC4/SuperCastlevania4#3-equipo-de-trabajo-y-reparto-de-tareas)
	* [3.1. Integrantes](https://github.com/DVI-SC4/SuperCastlevania4#31-integrantes)
	* [3.2. Software y herramientas empleadas](https://github.com/DVI-SC4/SuperCastlevania4#32-software-y-herramientas-empleadas)
	* [3.3. Tareas realizadas por cada integrante](https://github.com/DVI-SC4/SuperCastlevania4#33-tareas-realizadas-por-cada-integrante)
	* [3.4. Carga de trabajo](https://github.com/DVI-SC4/SuperCastlevania4#34-carga-de-trabajo)
* [4. Fuentes y referencias](https://github.com/DVI-SC4/SuperCastlevania4#4-fuentes-y-referencias)

# 1. Diseño del juego

## 1.1 Sobre el juego original

### Información general

Dentro de la nipona saga de juegos Castlevania, conocida a nivel mundial, tenemos el título "Super Castlevania IV" (en Japón: Akumajō Dracula 悪魔城ドラキュラ Akumajō Dorakyura, traducido literalmente como "Devil's Castle Dracula"). Éste un videojuego de acción-aventura desarrollado y publicado por Konami a finales de 1991 en Japón y en Norteamérica, y en 1992 en Europa. 

Fue el primer videojuego de la serie Castlevania en aparecer para la videoconsola Super Nintendo aprovechándose de las mejores características técnicas en comparación con su predecesora, la videoconsola Nintendo Entertainment System (NES), apoyado en un hardware de 16 bits y ayudado de múltiples efectos como el Modo 7.

Aunque se trata de un remake del juego Castlevania de NES, en realidad es una secuela de Castlevania II: Simon's Quest.

### Trama

La familia Belmont, a través de generaciones ha destruido a Drácula cada vez que volvía a campar sobre la faz de la Tierra. En esta ocasión, después de cien años, el vampiro regresa ayudado por un ejército de seres infernales y clásicos a la vez, entre los que se encuentran una suerte de monstruo de Frankenstein, la Momia, e incluso un familiar lejano de la mitológica Medusa. Una vez más, el actual heredero del clan Belmont deberá hacer frente a estos monstruos y al mismísimo Conde, adentrándose en los terrenos de Castlevania.

### Datos

* **Fecha de lanzamiento:** 31 de octubre de 1991
* **Desarrolladora:** Konami
* **Distribuidora:** Konami
* **Plataforma:** Super Nintendo (SNES/Super Famicom)
* **Director:** Masahiro Ueno (acréditado como Jun Furano)
* **Compositores:** Masanori Oodachi y Taro Kudo (acreditado como Souji Taro)
	
## 1.2. Objetivo del juego

En nuestra versión reducida de Super Castlevania IV podemos a jugar al primer nivel del juego, en el cual entramos al castillo y atravesamos parte de unos jardines y unas ruinas anexas, ambos lugares plagados de los enemigos básicos. 

Como en el original, el objetivo principal del nivel es avanzar hasta su final y, una vez allí, enfrentarse y derrotar al jefe final. En el camino, podremos encontrar velas con objetos que nos ayudaran a llegar al final, como son mas vidas y un látigo mejorado, que inflige mas daño a los enemigos. Una vez que derrotemos al jefe final habríamos ganado el juego.

Nada más entrar al castillo, estaremos expuestos a las hordas de enemigos y en peligro constante. Los monstruos pueden atacar al protagonista hasta agotar su barra de energía progresivamente. Si Simon se queda sin energía, quedará inconsciente y perderá una vida. Reaparecerá al principio de la misma escena en la que murió. Si Simon se queda sin vidas, la partida se acabará y se le dará la oportunidad de volver a empezar el nivel desde cero. Cabe destacar que nuestro personaje también puede perder una vida súbitamente si cae al agua o a algún foso.

## 1.3. Principales mecánicas

### 1. Simon

#### 1.1. Avance y retroceso

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/teclas_andando.png?raw=true" width="11%" align="left" />

![andando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/andando.gif?raw=true)

Simon puede caminar en ambos sentidos pulsando las teclas de dirección "izquierda" y "derecha".

#### 1.2. Agacharse

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/teclas_agacharse.png?raw=true" width="20%" align="left"/>

![agacharse](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/agacharse.gif?raw=true)

Para esquivar ciertos ataques, nuestro protagonista puede agacharse usando la tecla de dirección "abajo". Asimismo, mientras se encuentra agachado, puede seguir avanzando o retrocediendo en cuclillas si la situación lo requiere.

#### 1.3. Salto

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/teclas_saltando.png?raw=true" width="20%" align="left"/>

![saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/movimiento/saltando.gif?raw=true)

Simon también puede saltar pulsando la tecla "Q". Para mayor agilidad, durante el breve salto puede cambiar el sentido de su avance si pulsa "izquierda" o "derecha".

#### 1.4. Subir y bajar escaleras

Como parte indispensable de su avance por el nivel, Simon también es capaz de subir o bajar escaleras. 
* Para subir, al situarse encima del pie de las escaleras pulsará "derecha" o "izquierda" (según el sentido de la escalera) seguido de "arriba" y comenzará el ascenso.
* Para bajar, cuando el jugador se encuentra una escalera pulsará "derecha" o "izquierda" seguido de la tecla "abajo" para comenzar el descenso.

Una vez en la escalera, el jugador puede atacar en ambas direcciones, y subir y bajar la escalera.

#### 1.5. Ataque

El arma principal de Simon es el legendario látigo "Vampire Killer", el cual ha pasado de generación en generación en la familia Belmont durante siglos. Este arma de cazavampiros posee habilidades mágicas para luchar contra las criaturas infernales. 

Mediante la tecla "W", Simon enarbolará el látigo para asestar golpes a sus enemigos hasta destruirles. Además, durante la partida podrá recoger un hechizo de mejora que convierte al látigo en "Morning Star", haciéndolo más largo, férreo y permitiéndole hacer más daño por cada ataque.

Disponemos de distintas combinaciones de ataque, en ambas direcciones, para usar las que mejor se ajusten a la situación en la que Simon se vea envuelto.

##### 1.5.1 Ataques desde el suelo

###### 1.5.1.1 Ataque normal

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/teclas/W.png?raw=true" width="5%" align="left"/>

![atacando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/atacando.gif?raw=true)

###### 1.5.1.2 Ataque agachado

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/teclas_atacando_agachado.png?raw=true" width="14%" />

![atacando_agachado](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/atacando_agachado.gif?raw=true)

###### 1.5.1.3 Ataque en vertical

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/teclas_atacando_vertical.png?raw=true" width="14%"/>

![atacando_haciarriba](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/atacando_vertical.gif?raw=true)

###### 1.5.1.4 Ataque en diagonal

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/teclas_ataque_diagonal.png?raw=true" width="24%"/>

![atacando_diagonal](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20en%20el%20suelo/ataque_diagonal.gif?raw=true)

##### 1.5.2 Ataques en el aire

###### 1.5.2.1 Ataque normal saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_saltando.png?raw=true" width="24%" align="left"/>


![atacando_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_saltando.gif?raw=true)

###### 1.5.2.2 Ataque en vertical saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_vertical_saltando.png?raw=true" width="24%" />

![atacando_verticalarriba_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_vertical_saltando.gif?raw=true)

###### 1.5.2.3 Ataque hacia abajo saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_verticalabajo.png?raw=true" width="24%"/>

![atacando_verticalabajo_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_verticalabajo.gif?raw=true)

###### 1.5.2.4 Ataque en diagonal saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_diagonalarriba_saltando.png?raw=true" width="24%" />

![atacando_diagonal_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_diagonalarriba_saltando.gif?raw=true)

###### 1.5.2.5 Ataque en diagonal hacia abajo saltando

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/teclas_atacando_diagonalabajo_saltando.png?raw=true" width="24%"/>

![atacando_diagonal_abajo_saltando](https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/Gu%C3%ADa%20de%20movimientos/ataques%20saltando/atacando_diagonalabajo_saltando.gif?raw=true)


### 2. Enemigos 

Tenemos dos enemigos básicos el esqueleto y el murcielago. En ambos casos necesitan dos golpes del látigo básico para morir y un golpe del látigo mejorado.

En el caso de que se choquen con Simon le quitaran un punto de salud, se hará inmune por un tiempo limitado y retrocederá un poco respecto a su posición.

#### 2.1. Esqueleto

El esqueleto tiene la movilidad limitada, es decir, se mueve hacia la derecha y hacia la izquierda en un espacio limitado.

#### 2.2. Murcielago

El murcielago va por el aire volando hasta que se choque con una pared, que en ese caso cambiará la direccion.

### 3. Jefe Final

Como jefe final hemos elegido el propio del nivel, que es Rowdain. Este tiene 16 puntos de salud igual que Simon y le afecta el látigo igual que a los enemigos normales. Látigo normal quita un punto de salud y látigo mejorado quitará dos puntos.

Cuando la salud del jefe llega a la mitad desmonta su montura y tenemos que enfrentarnos con un esqueleto, que cada cierto tiempo se teletransporta a un punto aleatorio del nivel. Para avisarnos de que se va a teletransportar este parpadea unas cuantas veces y despues se teletransporta.

Una vez que matamos al jefe, hemos ganado el juego.

### 4. HUD

A un lado del HUD podemos ver la putuacion obtenida, la salud de Simon y la salud del jefe final. y al otro lado tenemos el nivel y la escena en la que nos encontramos y las vidas.

### 5. Velas

Generan objetos que nos facilitan la jugabilidad del juego, estos objetos son vidas, y upgrade del látigo.

## 1.4. Personajes

### 1. Simon Belmont

![Simon Belmont](https://i.gifer.com/1Pu8.gif)

Simon es un reconocido cazador de vampiros del siglo XVII, y también el primero en aparecer y uno de los más reconocidos de los héroes de la saga Castlevania. Es heredero del clan Belmont y del afamado látigo Matavampiros (Vampire Killer), convirtiéndose en el más famoso cazador de vampiros. 

Nacido alrededor del año 1669, Simon creció escuchando las historias de sus grandes antepasados que habían derrotado a Drácula, junto con aquellos que lo ayudaron. Mientras se entrenaba en las habilidades del látigo, solía preguntarse cómo estaría a la altura de estos guerreros legendarios.

A la edad de 22 años en el año 1691, tendría la oportunidad de demostrar que era digno del legado de su familia. En el día de Pascua, 100 años después de que fue derrotado por Christopher Belmont, el conde Drácula regresaba de nuevo al mundo de los vivos. Simon estaba determinado a poner fin a la amenaza de este nuevo reinado de terror, y entró solo en el castillo de Drácula para enfrentar al conde.

Simon es bastante temerario e inclinado a forzar su camino a través de las situaciones adversas y para su aventura lleva un peto hecho de cuero, botas altas y una diadema de metal.

### 2. Enemigos

Tenemos dos enemigos básicos el esqueleto y el murcielago, de los cuales ya hemos explicado sus mecánicas anteriormente.

### 3. Jefe final

Y de jefe final hemos introducido a Rowdain que es un esqueleto montado sobre un esqueleto de animal. Cuando le hemos golpeado varias veces, nos pasamos a enfrentar a un esqueleto armado.

# 2. Diseño de la implementación

<img src="https://github.com/DVI-SC4/SuperCastlevania4/blob/master/Recursos%20memoria/arquitectura/estructura.png?raw=true" width="20%" />

Con la finalidad de mejorar la productividad a la hora de desarrollar y hacer mas sencillos los cambios que se puedan producir, hemos separado el codigo en archivos y los hemos tratado como si fueran modulos del propio Quintus, haciendo uso de su espacio de nombres.  

## 2.1 Arquitectura y jerarquía de archivos

Hemos separado el código por "módulos", asi todos los caracteres del juego se encuentran en la carpeta entidades, donde tambien estaran los componentes necesarios para estos. Todo lo relacionado con pantallas de carga, menues, etc. esta ubicado en otra carpeta y los archivos para la gestión de otro elementos clave del juego en otra carpeta.

Todo el codigo se carga desde un fichero principal (main.js), desde donde se hace la carga de los módulos de Quintus así como de los nuestros.

## 2.2 Principales componentes

El único componente que se ha implementado es para los enemigos, que comparten ciertas mecánicas y era lógico llevarlo a un punto común.

## 2.3 Implementaciones realizadas

* Pantalla de introducción

* Menú principal
	* Comenzar partida 	
	* Pantalla con los controles de Simon
	* Créditos
	
* Jugador principal
	* Sprites y animaciones	 
	* Movimientos básicos
	* Ataque y uso del látigo (arma principal)
	* Subir y bajar escaleras	

* Varias escenas del primer nivel del juego original
	* Lógica entre el cambio de escenas
	* Seguimiento al jugador a través del nivel

* Enemigos
	* Sprites y animaciones 
	* Movimiento
	* Lógica de ataque y salud

* Objetos recogibles
	* Vidas
	* Upgrade del látigo

* Jefe final del nivel
	* Sprites y animaciones
	* Movimientos básicos
	* Teletransporte
	* Lógica de ataque y gestión de la salud

* HUD
	* Medidor de energía del protagonista
	* Medidor de energía del jefe de nivel
	* Vidas restantes
	* Puntos acumulados

# 3. Equipo de trabajo y reparto de tareas

## 3.1. Integrantes

* [César Godino Rodríguez](https://github.com/cloudgrey)
* [Carmen López Gonzalo](https://github.com/calope03)
* [Sergio Pino Holgado](https://github.com/sepino)

## 3.2 Software y herramientas empleadas

### Desarrollo, depuración y testeo
* [Quintus JavaScript HTML5 Game Engine](http://www.html5quintus.com)
* [Sublime Text](https://www.sublimetext.com)
* [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)
* [Google Chrome](https://www.google.com/chrome/)
* [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/)
* [Safari](https://www.apple.com/es/safari/)
* [GitHub Desktop](https://desktop.github.com)

### Obtención y preparación de sprites
* [OpenEmu (OS X)](http://openemu.org)
* [Pixelmator (OS X)](http://www.pixelmator.com/mac/)
* [Vista Previa (OS X)](https://support.apple.com/es-es/guide/preview/prvwd4a90e45/mac)
* [Adobe Photoshop](https://www.adobe.com/es/products/photoshop.html)

### Obtención y edición de sonido
* [Audacity](https://www.audacityteam.org)
* [VLC media player](https://www.videolan.org/vlc/index.html)

### Desarrollo de nivel
* [Adobe Photoshop](https://www.adobe.com/es/products/photoshop.html)
* [Tiled](https://thorbjorn.itch.io/tiled)

### Memoria y documento de alcance
* [MacDown (OS X)](https://macdown.uranusjr.com)
* [Sublime Text](https://www.sublimetext.com)

### Presentacion
* [Google Presentaciones](https://docs.google.com/presentation/u/0/)
* [Camtasia Studio](https://www.techsmith.com/video-editor.html)

## 3.3. Tareas realizadas por cada integrante

* César:
	* Preparación de sprites, jsons y animaciones por frames de Simon, con posiciones de avance, ataques, saltos, escaleras...
	* Limpieza y preparación de sprite de Simon avanzando agachado a partir de capturas de emulación.
	* Programación de lógica de Simon: avance, saltos, agacharse, ataques con los diferentes combos... excepto su mecánica de comportamiento en escaleras.
	* Obtención y conversión de efectos de sonido, extrayéndolos de la grabación de una emulación.
	* Obtención de música de fondo (para introduccción, menú, nivel y créditos).
	* Obtención de imágenes con el recorrido visual (mapa en "horizontal") de los distintos niveles.
	* Limpieza y preparación de sprites de los elementos del HUD y de las armas secundarias, a partir de capturas de pantalla de una emulación.
	* Preparación de sprites y jsons de elementos de interacción del primer nivel (velas, esfera final, etc.).
	* Preparación de sprites de objetos recogibles (mejora de látigo, carne, corazones, etc.).
	* Preparación de sprites y jsons de enemigos básicos (murciélago, esqueleto, bicéfalo, etc.) con posiciones de avance, ataques y muerte.
	* Redacción de la memoria
		* Sección 1.1 Sobre el juego original
		* Sección 1.2 Objetivo del juego	 
		* Sección 1.3 Principales mecánicas (con preparación y edición de los gifs y las imágenes de combinaciones de teclas).
		* Sección de Simon en 1.4 Personajes.
		* Sección 2.3 Implementaciones realizadas
		* Sección 3.2 Software y herramientas empleadas
		* Sección 4 Fuentes y referencias
	* Realización de la intro del juego con los logos de la UCM y FdI.
	* Realización del menú principal del juego, junto con el sprite animado del selector en forma de llama.
	* Realización de la sección de controles del personaje, junto a las capturas de las poses de Simon.
	* Realización de los créditos del juego junto con el sprite animado de Simon al final y composición de los mensajes con las letras oficiales del juego.
	* Preparación de las imágenes con letras para la pantalla de Game Over.
* Carmen:
	* Preparación de los recursos necesarios para las diferentes escenas.
	* Realización de las diferentes escenas con Tiled.
	* Programación de la lógica del cambio de escenas.
	* Gestión del seguimiento de la cámara al jugador en el juego.
	* Añadidos todos los elementos del juego y sus atributos opcionales en el mapa.
	* Control de Simon en las escaleras:
		* Escaleras de subida
		* Escaleras de bajada
		* Detección del fin de la escalera
		* Atacar en escalera
		* Moverse hacia arriba y hacia abajo en la escalera
	* Detalles en los enemigos
		* Limitación del movimiento del esqueleto
		* Gestión de los golpes recibidos según sea el látigo normal o el mejorado
	* Gestión de la inmunidad de Simon una vez golpeado.
	* Preparación de los elementos del HUD
	* Programación y gestión de los elementos del HUD:
		* Salud de Simon que se reduce cuando le atacan
		* Puntuación del jugador que aumenta con cada enemigo eliminado
		* Vidas del jugador, que aumentan si las recoge
		* Muestra el nivel y la escena en la que nos encontramos
		* Salud del jefe del nivel
	* Creación de las pantallas de Game Over y de You Win
	* Programación de la lógica de las velas con los objetos recogibles
		* Vidas
		* Upgrade del látigo
	* Programación de la lógica del movimiento del jefe final.
	* Revisión y redacción de la memoria: 
		* Mecanicas principales
		* Informacion de los personajes
		* Implementaciones realizadas
* Sergio:
	* Redacción del documento de alcance.
	* Separación del codigo utilizando el espacio de nombres.
	* Reestructuración y ordenación de código en diferentes direcctorios del repositorio.
	* Preparación de los sprites de los enemigos.
	* Codigo y animación para enemigo Skeleton.
	* Codigo y animación para enemigo Bat.
	* Creación del componente enemy para Skeleton y Bat.
		* Gestión de las colisiones con el látigo y Simon.
	* Animación de la llama que aparece al morir un enemigo.
	* Conversión .ogg a .mp3 para que sea compatible en todos los navegadores
	* Inclusión de los sonidos en el juego
		* Escenas 
		* Látigo
		* Muerte enemigo
	* Preparación de los sprites del jefe final.
	* Código de las mecánicas básicas del jefe final.
	* Código y animación para boss Rowdain.
	* Redacción de la memoria
		* Diseño e implementación
		* Arquitectura

## 3.4. Carga de trabajo

* César: 33%
* Carmen: 33%
* Sergio: 33%

# 4. Fuentes y referencias

## Recursos

* [CastlevaniaCrypt](http://www.castlevaniacrypt.com/cv4/maps)
* [CastlevaniaDungeon](https://castlevaniadungeon.net/games/scv4foreign.html)
* [SpritesIncCo](http://www.sprites-inc.co.uk/vania/OtherConsole/SCV4/)
* [ChapelOfResonance](http://www.chapelofresonance.com/media/scv4-rips.html)
* [The Spriters Resource](https://www.spriters-resource.com/snes/scstlevnia4/)
* [Icon Experience](https://www.iconexperience.com/v_collection/icons/?icon=keyboard)
* [VGMuseum](http://www.vgmuseum.com/mrp/multi/randomsprites.htm)
* [Nuestra propia extracción manual de sonidos y de algunos sprites a partir de un emulador]()

## Información general sobre el juego

* [Castlevania Wikia](http://es.castlevania.wikia.com/wiki/Simon_Belmont)
* [Super Castlevannia IV en Wikipedia](https://es.wikipedia.org/wiki/Super_Castlevania_IV)


