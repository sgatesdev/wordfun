export const getRandomIcon = (type: boolean) => {
  if (type) {
    return happyIcons[Math.floor(Math.random() * happyIcons.length)]
  } else {
    return sadIcons[Math.floor(Math.random() * sadIcons.length)]
  }
}

const happyIcons = [
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-heart-eyes-fill" viewBox="0 0 16 16">
	<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.559 5.448a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-wink-fill" viewBox="0 0 16 16">
	<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 6.5C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5M4.285 9.567a.5.5 0 0 0-.183.683A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75.5.5 0 0 0-.683-.183m5.152-3.31a.5.5 0 0 0-.874.486c.33.595.958 1.007 1.687 1.007.73 0 1.356-.412 1.687-1.007a.5.5 0 0 0-.874-.486.934.934 0 0 1-.813.493.934.934 0 0 1-.813-.493z"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-kiss-fill" viewBox="0 0 16 16">
	<path d="M16 8a8 8 0 1 0-2.697 5.99c-.972-.665-1.632-1.356-1.99-2.062-.388-.766-.419-1.561-.075-2.23.496-.97 1.73-1.466 2.762-1.05.65-.262 1.38-.162 1.957.19.028-.275.043-.555.043-.838ZM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m1.512 3.647c-.347.08-.737.198-1.107.319a.5.5 0 1 1-.31-.95c.38-.125.802-.254 1.192-.343.37-.086.78-.153 1.103-.108.16.022.394.085.561.286.188.226.187.497.131.705a1.894 1.894 0 0 1-.31.593c-.077.107-.168.22-.275.343.107.124.199.24.276.347.142.197.256.397.31.595.055.208.056.479-.132.706-.168.2-.404.262-.563.284-.323.043-.733-.027-1.102-.113a14.87 14.87 0 0 1-1.191-.345.5.5 0 1 1 .31-.95c.371.12.761.24 1.109.321.176.041.325.069.446.084a5.609 5.609 0 0 0-.502-.584.5.5 0 0 1 .002-.695 5.52 5.52 0 0 0 .5-.577 4.465 4.465 0 0 0-.448.082Zm.766-.086-.006-.002c.004 0 .006.002.006.002m.002 1.867h-.001l-.005.001a.038.038 0 0 1 .006-.002Zm.157-4.685a.5.5 0 0 1-.874-.486A1.934 1.934 0 0 1 10.25 5.75c.73 0 1.356.412 1.687 1.007a.5.5 0 1 1-.874.486.934.934 0 0 0-.813-.493.934.934 0 0 0-.813.493ZM14 9.828c1.11-1.14 3.884.856 0 3.422-3.884-2.566-1.11-4.562 0-3.421Z"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-laughing-fill" viewBox="0 0 16 16">
	<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5c0 .501-.164.396-.415.235C6.42 6.629 6.218 6.5 6 6.5c-.218 0-.42.13-.585.235C5.164 6.896 5 7 5 6.5 5 5.672 5.448 5 6 5s1 .672 1 1.5m5.331 3a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5m-1.746-2.765C10.42 6.629 10.218 6.5 10 6.5c-.218 0-.42.13-.585.235C9.164 6.896 9 7 9 6.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5c0 .501-.164.396-.415.235z"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-grin-fill" viewBox="0 0 16 16">
	<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M6.488 7c-.23-.598-.661-1-1.155-1-.493 0-.924.402-1.155 1A2.794 2.794 0 0 1 4 6c0-1.105.597-2 1.333-2 .737 0 1.334.895 1.334 2 0 .364-.065.706-.179 1Zm5.334 0c-.23-.598-.662-1-1.155-1-.494 0-.925.402-1.155 1a2.793 2.793 0 0 1-.179-1c0-1.105.597-2 1.334-2C11.403 4 12 4.895 12 6c0 .364-.065.706-.178 1M2.696 8.756a.48.48 0 0 1 .382-.118C4.348 8.786 6.448 9 8 9c1.553 0 3.653-.214 4.922-.362a.48.48 0 0 1 .383.118.3.3 0 0 1 .096.29c-.09.47-.242.921-.445 1.342-.263.035-.576.075-.929.115A36.798 36.798 0 0 1 8 10.75c-1.475 0-2.934-.123-4.027-.247-.353-.04-.666-.08-.93-.115A5.457 5.457 0 0 1 2.6 9.045a.3.3 0 0 1 .097-.29ZM8 13.5a5.49 5.49 0 0 1-4.256-2.017l.116.014c1.115.126 2.615.253 4.14.253 1.525 0 3.025-.127 4.14-.253l.117-.014A5.49 5.49 0 0 1 8 13.5"/>
   	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-sunglasses-fill" viewBox="0 0 16 16">
	<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.22 4.22 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A2.99 2.99 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515zM4.969 9.75A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z"/>
   	</svg>

]

const sadIcons = [
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-angry-fill" viewBox="0 0 16 16">
	<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-grimace-fill" viewBox="0 0 16 16">
	<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M7 6.25C7 5.56 6.552 5 6 5s-1 .56-1 1.25.448 1.25 1 1.25 1-.56 1-1.25m3 1.25c.552 0 1-.56 1-1.25S10.552 5 10 5s-1 .56-1 1.25.448 1.25 1 1.25m1.5 4.5a1.5 1.5 0 0 0 1.48-1.25v-.003a1.512 1.512 0 0 0 0-.497A1.5 1.5 0 0 0 11.5 9h-7a1.5 1.5 0 0 0-1.48 1.25v.003a1.51 1.51 0 0 0 0 .497A1.5 1.5 0 0 0 4.5 12zm-7.969-1.25a1 1 0 0 0 .969.75h.25v-.75zm8.938 0a1 1 0 0 1-.969.75h-.25v-.75h1.219M11.5 9.5a1 1 0 0 1 .969.75H11.25V9.5zm-7.969.75A1 1 0 0 1 4.5 9.5h.25v.75zM5.25 11.5h1v-.75h-1zm2.5 0h-1v-.75h1zm1.5 0h-1v-.75h1zm1.5 0h-1v-.75h1zm-1-2h1v.75h-1zm-1.5 0h1v.75h-1zm-1.5 0h1v.75h-1zm-1.5 0h1v.75h-1z"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-dizzy-fill" viewBox="0 0 16 16">
	<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zm5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708M8 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
	<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
	</svg>,
	<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" className="bi bi-emoji-neutral-fill" viewBox="0 0 16 16">
	<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
   	</svg>
]