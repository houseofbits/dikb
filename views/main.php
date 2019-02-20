
<transition name="fade"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"

            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave">

    <div v-if="isMain" class="active_content">
        <div id="intro">
            <div>
                <div class="dark_image_title">Interjera noformējums</div>

                <ul class="dots">
                    <li class="arrow l"></li>
                    <li class="arrow r"></li>
                </ul>
                <div id="slide_container">
                    <div id="slide_container_move">
                        <img class="first" src="" width="520px"/>
                        <img class="second" src="" width="520px"/>
                    </div>
                </div>

            </div>

            <div>Dizaina un Interjera Konsultāciju<br /> Birojs</div>
            <div>
                Arhitektūras pakalpojumi<br>
                Specializētie projektēšanas darbi<br>
                Interjera dizains<br>
                Mēbeļu projektēšana<br>
                Muzeju ekspozīcijas<br>
            </div>
        </div>
        <div id="frontpage_icons" class="icons">
            <div class="hline"><a href="">Realizētie projekti</a></div>
            <div class="icon_wrap">
                <thumbnail v-for="(article, index) in data.frontPageArticles" :article="article" :key="index"></thumbnail>
            </div>
        </div>
    </div>

</transition>
