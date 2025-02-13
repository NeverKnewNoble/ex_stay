<template>
    <div class="w-full h-screen bg-gray-200 text-black">
        <!-- **Navbar -->
        <div
        :class="[
            isScrollingDown ? '-translate-y-full' : 'translate-y-0',
            ' w-full transition-transform duration-500 ease-in-out z-50 border-b-2 border-b-bg-gray-300 bg-white shadow-md'
        ]">
            <NavBar/>
        </div>

        <!-- **Title and filter -->
        <section class="w-full bg-white relative overflow-hidden px-[80px]">
            <h1 class="pt-[80px] text-[50px] text-[#6ea589]">Catalogue</h1>

            <div class="w-full bg-white h-[200px] rounded-sm border border-[#6ea589]">
                <button class="bg-white text-[#6ea589] w-[150px] rounded-sm border-[#6ea589] border py-2">Active Filters</button>
                <div class="flex items-center justify-center gap-2 mt-2">
                    <div class="flex items-center">
                        <!-- **Naive UI Date Picker -->
                        <n-date-picker v-model:value="range" type="daterange" clearable class="text-black"/>
                    </div>
                    <div class="flex items-center">
                        <GuestDropdown />
                    </div>
                </div>
            </div>
        </section>

        <!-- **Catalogue -->
        <section class="w-full bg-white min-h-screen pt-10 px-[80px] pb-20">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-x-2">
                <!-- Listing 1 -->
                <router-link to="/booking" class="cursor-pointer">
                    <listingCard
                        location="Accra, Ghana"
                        :distance="25"
                        price="GH₵499"
                        imageUrl="../../assets/images/savvana.jpg"
                    />
                </router-link>
                <!-- Listing 2 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/sundown.jpg"
                />
                <!-- Listing 3 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/beachvue.jpg"
                />
                <!-- Listing 4 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/homebanner.jpg"
                />
                <!-- Listing 1 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/savvana.jpg"
                />
                <!-- Listing 2 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/savvana.jpg"
                />
                <!-- Listing 3 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/savvana.jpg"
                />
                <!-- Listing 4 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/savvana.jpg"
                />
                                <!-- Listing 1 -->
                                <router-link to="/booking" class="cursor-pointer">
                    <listingCard
                        location="Accra, Ghana"
                        :distance="25"
                        price="GH₵499"
                        imageUrl="../../assets/images/savvana.jpg"
                    />
                </router-link>
                <!-- Listing 2 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/sundown.jpg"
                />
                <!-- Listing 3 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/beachvue.jpg"
                />
                <!-- Listing 4 -->
                <listingCard
                    location="Accra, Ghana"
                    :distance="25"
                    price="GH₵499"
                    imageUrl="../../assets/images/homebanner.jpg"
                />
            </div>

            <div class="flex items-center justify-center pt-15">
                <n-pagination v-model:page="page" :page-count="100" />
            </div>
        </section>

        <!-- **Footer -->
        <FooterComponent/>
    </div>
</template>

<script>
import NavBar from '../components/elements/navbar.vue';
import FooterComponent from '../components/elements/footer.vue';
import GuestDropdown from '../components/widgets/guests.vue'; 
import listingCard from '../components/widgets/listingCard.vue';

export default {
  name: "BookingPage",
  components: {
    NavBar,
    FooterComponent,
    listingCard,
    GuestDropdown,
  },
}
</script>
