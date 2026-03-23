import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Education.css";

export default function EduSection() {
  const canvasContainerRef = useRef(null);
  const slidesRef = useRef([]);
  const scrollRef = useRef({
    currentScroll: 0,
    targetScroll: 0,
    mouse: { x: 0, y: 0 },
    pointerDown: false,
    startX: 0,
  });

  useEffect(() => {
    const CONFIG = {
      slideCount: 2,
      spacingX: 45,
      pWidth: 14,
      pHeight: 18,
      camZ: 30,
      wallAngleY: -0.25,
      lerpSpeed: 0.06,
    };

    const totalGalleryWidth = CONFIG.slideCount * CONFIG.spacingX;

    // Three.js 场景、相机、渲染器
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f7f5);
    scene.fog = new THREE.Fog(0xf7f7f5, 10, 110);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, CONFIG.camZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainerRef.current.appendChild(renderer.domElement);

    // 光源
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // 画廊组
    const galleryGroup = new THREE.Group();
    scene.add(galleryGroup);

    const textureLoader = new THREE.TextureLoader();
    const planeGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);

    const images = ["./images/middlesex.jpg", "./images/nanjing.png"];
    const paintingGroups = [];

    for (let i = 0; i < CONFIG.slideCount; i++) {
      const group = new THREE.Group();
      group.position.set(i * CONFIG.spacingX, 0, 0);

      const mat = new THREE.MeshBasicMaterial({ map: textureLoader.load(images[i]) });
      const mesh = new THREE.Mesh(planeGeo, mat);

      const edges = new THREE.EdgesGeometry(planeGeo);
      const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x222222 }));

      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight),
        new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.15 })
      );
      shadow.position.set(0.8, -0.8, -0.5);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-CONFIG.spacingX / 2, 14, -1),
        new THREE.Vector3(CONFIG.spacingX / 2, 14, -1),
        new THREE.Vector3(-CONFIG.spacingX / 2, -14, -1),
        new THREE.Vector3(CONFIG.spacingX / 2, -14, -1),
      ]);
      const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xdddddd }));

      group.add(shadow, mesh, outline, lines);
      galleryGroup.add(group);
      paintingGroups.push(group);
    }

    galleryGroup.rotation.y = CONFIG.wallAngleY;
    galleryGroup.position.x = 8;

    // UI 更新文字显示
    const updateUI = (scrollX) => {
      let rawIndex = scrollX / CONFIG.spacingX;
      let index = Math.round(rawIndex) % CONFIG.slideCount;
      if (index < 0) index += CONFIG.slideCount;

      slidesRef.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === index ? "1" : "0";
        el.style.pointerEvents = i === index ? "auto" : "none";
      });
    };

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      // 阻尼平滑滚动
      scrollRef.current.currentScroll +=
        (scrollRef.current.targetScroll - scrollRef.current.currentScroll) * CONFIG.lerpSpeed;

      const xMove = scrollRef.current.currentScroll * Math.cos(CONFIG.wallAngleY);
      const zMove = scrollRef.current.currentScroll * Math.sin(CONFIG.wallAngleY);
      camera.position.x = xMove;
      camera.position.z = CONFIG.camZ - zMove;

      // 循环滚动
      paintingGroups.forEach((group, i) => {
        const originalX = i * CONFIG.spacingX;
        const distFromCam = scrollRef.current.currentScroll - originalX;
        const shift = Math.round(distFromCam / totalGalleryWidth) * totalGalleryWidth;
        group.position.x = originalX + shift;
      });

      camera.rotation.x = scrollRef.current.mouse.y * 0.05;
      camera.rotation.y = -scrollRef.current.mouse.x * 0.05;

      updateUI(scrollRef.current.currentScroll);

      renderer.render(scene, camera);
    };

    animate();

    // ===== 鼠标拖动 =====
    const container = canvasContainerRef.current;

    const onPointerDown = (e) => {
      scrollRef.current.pointerDown = true;
      scrollRef.current.startX = e.clientX;
    };

    const onPointerMove = (e) => {
      if (!scrollRef.current.pointerDown) return;
      const delta = scrollRef.current.startX - e.clientX;
      scrollRef.current.targetScroll += delta * 0.5; // 灵敏度
      scrollRef.current.startX = e.clientX;
    };

    const onPointerUp = () => {
      scrollRef.current.pointerDown = false;
    };

    // 鼠标滚轮缩放阻尼
    const onWheel = (e) => {
      e.preventDefault();
      scrollRef.current.targetScroll += e.deltaY * 0.2;
    };

    // touch 支持
    let touchStartX = 0;
    const handleTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
    const handleTouchMove = (e) => {
      const diff = touchStartX - e.touches[0].clientX;
      scrollRef.current.targetScroll += diff * 0.5;
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {};

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    // 窗口自适应
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="edu-sec">
      <div className="edu-logo edu-logo-sec">Education</div>
      <div id="canvas-container" ref={canvasContainerRef} className="canvas-container-sec"></div>
      <div id="ui-layer" className="ui-layer-sec">
        {/* Slide 1 */}
        <div className="edu-sld active" ref={(el) => (slidesRef.current[0] = el)}>
          <span className="edu-tag edu-tag-sec">London, UK</span>
          <h1 className="edu-title edu-title-sec">
            <span className="edu-title-main edu-title-main-sec">Middlesex University</span>
            <span className="edu-title-underline edu-title-underline-sec"></span>
            <span className="edu-title-sub edu-title-sub-sec">MSc International Business Management</span>
          </h1>
          <div className="edu-desc edu-desc-sec">
            Completed my Master’s dissertation with Distinction, while strengthening analytical, research, and cross-cultural teamwork skills through extensive case studies and collaborative group projects.
          </div>
          <div className="edu-meta edu-meta-sec">
            <span className="edu-meta__label edu-meta__label-sec">Date</span>
            <span className="edu-meta__value edu-meta__value-sec">Jul 2024 – Oct 2025</span>
            <span className="edu-meta__label edu-meta__label-sec">Module</span>
            <span className="edu-meta__value edu-meta__value-sec">Management Analytics</span>
            <span className="edu-meta__label edu-meta__label-sec">Module</span>
            <span className="edu-meta__value edu-meta__value-sec">International Business Strategy</span>
            <span className="edu-meta__label edu-meta__label-sec">Module</span>
            <span className="edu-meta__value edu-meta__value-sec">Applied Corporate Finance</span>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="edu-sld" ref={(el) => (slidesRef.current[1] = el)}>
          <span className="edu-tag edu-tag-sec">Nanjing, China</span>
          <h1 className="edu-title edu-title-sec">
            <span className="edu-title-main edu-title-main-sec">Nanjing Polytechnic Institute</span>
            <span className="edu-title-underline edu-title-underline-sec"></span>
            <span className="edu-title-sub edu-title-sub-sec">Diploma in Cloud Computing Technology Applications</span>
          </h1>
          <div className="edu-desc edu-desc-sec">
            Built a strong foundation in cloud computing and IT technologies, and further developed expertise in cloud architecture, data processing, and web development through hands-on projects and practical training.
          </div>
          <div className="edu-meta edu-meta-sec">
            <span className="edu-meta__label edu-meta__label-sec">Date</span>
            <span className="edu-meta__value edu-meta__value-sec">Sep 2021 – Jun 2024</span>
            <span className="edu-meta__label edu-meta__label-sec">Project</span>
            <span className="edu-meta__value edu-meta__value-sec">Full-Stack Website Development</span>
            <span className="edu-meta__label edu-meta__label-sec">Project</span>
            <span className="edu-meta__value edu-meta__value-sec">Cloud Computing Architecture</span>
            <span className="edu-meta__label edu-meta__label-sec">Project</span>
            <span className="edu-meta__value edu-meta__value-sec">Big Data Platform Development</span>
          </div>
        </div>
      </div>
      <div className="edu-scroll-hint edu-scroll-hint-sec"></div>
    </section>
  );
}