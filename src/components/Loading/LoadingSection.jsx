import "./Loading.css"
import { useEffect } from "react"

function Loading() {

  useEffect(() => {

    const text = document.querySelector(".loading-text")

    let dots = 0

    const interval = setInterval(() => {
      dots = (dots + 1) % 4
      text.innerText = "Loading" + ".".repeat(dots)
    }, 500)


    // 创建 dots
    const loading = document.querySelector(".loading")

    for (let i = 0; i < 36; i++) {
      const dot = document.createElement("div")
      dot.className = "dot"
      loading.appendChild(dot)
    }


    // // loading 消失
    // setTimeout(() => {
    //   const loadingSection = document.querySelector(".loadingsection")

    //   loadingSection.classList.add("fade-out")

    //   setTimeout(() => {
    //     loadingSection.style.display = "none"
    //   }, 1000)

    // }, 8000)


    // 清除 interval（React推荐）
    return () => clearInterval(interval)

  }, [])

    return (
    <section className="loadingsection">
         <div className="loading-wrapper">
            <div className="loading-text">Loading...</div>
            <div className="loading">

            </div>
         </div>
    </section>

    )
}

export default Loading