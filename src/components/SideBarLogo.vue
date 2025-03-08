<template>
    <div class="sidebarLogo">
        <div class="imageflex">
            <img src="../assets/icons/Manolito.png" alt="ManolitoLogo" class="sidebarLogo"/>
        </div>
        <div class="imageflexcontent">
            <h1>Youtan Dash</h1>
        </div>
    </div>
</template>
<style lang="css">
.sidebarLogo {
  position: relative;
}

.imageflex {
  display: flex;
}

.imageflex img {
  top: 40px;
  width: 80px;
  height: 80px;
  position: fixed;
  z-index: 1;
}

.imageflexcontent {
  position: fixed;
  left: 100px;
  top: 35px;
  z-index: 2;
  color: rgb(255, 255, 255); /* Adjust the color as needed */
  white-space: nowrap;
}

.imageflexcontent h1 {
  font-weight: 900; /* Make the text bolder */
  font-size: 2rem; /* Adjust the font size as needed */
}


</style>