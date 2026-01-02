"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function StereoVisionDemo({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let time = 0;
        let animationId: number;

        // Full 33-point pose with fingers (BlazePose-style)
        const getHumanPose = (t: number) => {
            // Animation cycle - different movements
            const cycle = (t * 0.15) % 4; // 4 different poses

            // Base body positions
            const head = { x: 0.5, y: 0.08 };
            const neck = { x: 0.5, y: 0.15 };
            const leftShoulder = { x: 0.38, y: 0.19 };
            const rightShoulder = { x: 0.62, y: 0.19 };

            let leftElbow, rightElbow, leftWrist, rightWrist;

            if (cycle < 1) {
                // Pose 1: Arms raised up
                const raise = Math.sin(t * 2) * 0.5 + 0.5;
                leftElbow = { x: 0.32, y: 0.15 - raise * 0.08 };
                rightElbow = { x: 0.68, y: 0.15 - raise * 0.08 };
                leftWrist = { x: 0.28, y: 0.08 - raise * 0.06 };
                rightWrist = { x: 0.72, y: 0.08 - raise * 0.06 };
            } else if (cycle < 2) {
                // Pose 2: Waving right hand
                const wave = Math.sin(t * 4) * 0.05;
                leftElbow = { x: 0.28, y: 0.32 };
                leftWrist = { x: 0.22, y: 0.42 };
                rightElbow = { x: 0.72, y: 0.12 };
                rightWrist = { x: 0.78 + wave, y: 0.05 };
            } else if (cycle < 3) {
                // Pose 3: T-pose arms out
                leftElbow = { x: 0.22, y: 0.20 };
                rightElbow = { x: 0.78, y: 0.20 };
                leftWrist = { x: 0.08, y: 0.21 };
                rightWrist = { x: 0.92, y: 0.21 };
            } else {
                // Pose 4: Crossed arms / touching shoulders
                const cross = Math.sin(t * 1.5) * 0.5 + 0.5;
                leftElbow = { x: 0.45 + cross * 0.1, y: 0.30 };
                rightElbow = { x: 0.55 - cross * 0.1, y: 0.30 };
                leftWrist = { x: 0.55, y: 0.22 };
                rightWrist = { x: 0.45, y: 0.22 };
            }

            const spine = { x: 0.5, y: 0.35 };
            const leftHip = { x: 0.43, y: 0.42 };
            const rightHip = { x: 0.57, y: 0.42 };
            const leftKnee = { x: 0.42, y: 0.58 };
            const rightKnee = { x: 0.58, y: 0.58 };
            const leftAnkle = { x: 0.41, y: 0.73 };
            const rightAnkle = { x: 0.59, y: 0.73 };
            const leftFoot = { x: 0.39, y: 0.76 };
            const rightFoot = { x: 0.61, y: 0.76 };

            // Hand/finger positions (simplified 5 points per hand)
            const fingerSpread = Math.sin(t * 2) * 0.02;

            // Left hand fingers
            const leftThumb = { x: leftWrist.x + 0.03, y: leftWrist.y + 0.02 };
            const leftIndex = { x: leftWrist.x - 0.02, y: leftWrist.y + 0.04 };
            const leftMiddle = { x: leftWrist.x - fingerSpread, y: leftWrist.y + 0.045 };
            const leftRing = { x: leftWrist.x + 0.01, y: leftWrist.y + 0.04 };
            const leftPinky = { x: leftWrist.x + 0.025, y: leftWrist.y + 0.035 };

            // Right hand fingers
            const rightThumb = { x: rightWrist.x - 0.03, y: rightWrist.y + 0.02 };
            const rightIndex = { x: rightWrist.x + 0.02, y: rightWrist.y + 0.04 };
            const rightMiddle = { x: rightWrist.x + fingerSpread, y: rightWrist.y + 0.045 };
            const rightRing = { x: rightWrist.x - 0.01, y: rightWrist.y + 0.04 };
            const rightPinky = { x: rightWrist.x - 0.025, y: rightWrist.y + 0.035 };

            return {
                // Body (15)
                head, neck, leftShoulder, rightShoulder, leftElbow, rightElbow,
                leftWrist, rightWrist, spine, leftHip, rightHip, leftKnee,
                rightKnee, leftAnkle, rightAnkle, leftFoot, rightFoot,
                // Left hand (5)
                leftThumb, leftIndex, leftMiddle, leftRing, leftPinky,
                // Right hand (5)
                rightThumb, rightIndex, rightMiddle, rightRing, rightPinky,
                // Face points (simplified: 6)
                leftEye: { x: 0.47, y: 0.06 },
                rightEye: { x: 0.53, y: 0.06 },
                nose: { x: 0.5, y: 0.07 },
                mouth: { x: 0.5, y: 0.085 },
                leftEar: { x: 0.44, y: 0.07 },
                rightEar: { x: 0.56, y: 0.07 },
            };
        };

        const drawHuman = (pose: ReturnType<typeof getHumanPose>, offsetX: number, scale: number) => {
            const w = canvas.width;
            const h = canvas.height;

            const toCanvas = (p: { x: number; y: number }) => ({
                x: p.x * w * scale + offsetX,
                y: p.y * h + 15
            });

            const drawLimb = (p1: { x: number; y: number }, p2: { x: number; y: number }, width: number = 3) => {
                const c1 = toCanvas(p1);
                const c2 = toCanvas(p2);
                ctx.beginPath();
                ctx.moveTo(c1.x, c1.y);
                ctx.lineTo(c2.x, c2.y);
                ctx.lineWidth = width;
                ctx.stroke();
            };

            ctx.strokeStyle = "#008080";
            ctx.lineCap = "round";

            // === Draw body skeleton ===
            ctx.lineWidth = 4;

            // Spine & torso
            drawLimb(pose.head, pose.neck, 3);
            drawLimb(pose.neck, pose.spine, 4);
            drawLimb(pose.spine, pose.leftHip, 4);
            drawLimb(pose.spine, pose.rightHip, 4);
            drawLimb(pose.leftHip, pose.rightHip, 3);

            // Shoulders
            drawLimb(pose.neck, pose.leftShoulder, 3);
            drawLimb(pose.neck, pose.rightShoulder, 3);
            drawLimb(pose.leftShoulder, pose.rightShoulder, 2);

            // Arms
            drawLimb(pose.leftShoulder, pose.leftElbow, 4);
            drawLimb(pose.leftElbow, pose.leftWrist, 3);
            drawLimb(pose.rightShoulder, pose.rightElbow, 4);
            drawLimb(pose.rightElbow, pose.rightWrist, 3);

            // Legs
            drawLimb(pose.leftHip, pose.leftKnee, 4);
            drawLimb(pose.leftKnee, pose.leftAnkle, 4);
            drawLimb(pose.leftAnkle, pose.leftFoot, 2);
            drawLimb(pose.rightHip, pose.rightKnee, 4);
            drawLimb(pose.rightKnee, pose.rightAnkle, 4);
            drawLimb(pose.rightAnkle, pose.rightFoot, 2);

            // === Draw fingers ===
            ctx.strokeStyle = "#00a0a0";
            // Left hand
            drawLimb(pose.leftWrist, pose.leftThumb, 2);
            drawLimb(pose.leftWrist, pose.leftIndex, 2);
            drawLimb(pose.leftWrist, pose.leftMiddle, 2);
            drawLimb(pose.leftWrist, pose.leftRing, 2);
            drawLimb(pose.leftWrist, pose.leftPinky, 2);
            // Right hand
            drawLimb(pose.rightWrist, pose.rightThumb, 2);
            drawLimb(pose.rightWrist, pose.rightIndex, 2);
            drawLimb(pose.rightWrist, pose.rightMiddle, 2);
            drawLimb(pose.rightWrist, pose.rightRing, 2);
            drawLimb(pose.rightWrist, pose.rightPinky, 2);

            // === Draw all joints ===
            const bodyJoints = [
                pose.head, pose.neck, pose.leftShoulder, pose.rightShoulder,
                pose.leftElbow, pose.rightElbow, pose.leftWrist, pose.rightWrist,
                pose.spine, pose.leftHip, pose.rightHip, pose.leftKnee, pose.rightKnee,
                pose.leftAnkle, pose.rightAnkle, pose.leftFoot, pose.rightFoot
            ];

            const fingerJoints = [
                pose.leftThumb, pose.leftIndex, pose.leftMiddle, pose.leftRing, pose.leftPinky,
                pose.rightThumb, pose.rightIndex, pose.rightMiddle, pose.rightRing, pose.rightPinky
            ];

            const faceJoints = [
                pose.leftEye, pose.rightEye, pose.nose, pose.mouth, pose.leftEar, pose.rightEar
            ];

            // Draw body joints (larger)
            bodyJoints.forEach((joint) => {
                const c = toCanvas(joint);
                ctx.beginPath();
                ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = "#00c0c0";
                ctx.fill();
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            // Draw finger joints (smaller)
            fingerJoints.forEach((joint) => {
                const c = toCanvas(joint);
                ctx.beginPath();
                ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#00e0e0";
                ctx.fill();
            });

            // Draw face joints (small)
            faceJoints.forEach((joint) => {
                const c = toCanvas(joint);
                ctx.beginPath();
                ctx.arc(c.x, c.y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = "#00d0d0";
                ctx.fill();
            });

            // Head circle
            const headPos = toCanvas(pose.head);
            ctx.beginPath();
            ctx.arc(headPos.x, headPos.y, 18, 0, Math.PI * 2);
            ctx.strokeStyle = "#008080";
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        const animate = () => {
            time += 0.025;
            const w = canvas.width;
            const h = canvas.height;

            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, w, h);

            const pose = getHumanPose(time);
            drawHuman(pose, w * 0.25, 0.5);

            // Stats
            ctx.font = "bold 10px JetBrains Mono, monospace";
            ctx.fillStyle = "#00c853";
            ctx.textAlign = "left";
            ctx.fillText("● TRACKING", 10, 18);

            ctx.fillStyle = "#94a3b8";
            ctx.fillText("JOINTS: 33", 10, 33);
            ctx.fillText("FINGERS: 10", 10, 48);

            ctx.textAlign = "right";
            ctx.fillStyle = "#00b0b0";
            ctx.fillText("60 FPS", w - 10, 18);
            ctx.fillStyle = "#94a3b8";
            const confidence = 98.5 + Math.sin(time * 2) * 1.2;
            ctx.fillText(`${confidence.toFixed(1)}%`, w - 10, 33);

            animationId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`relative ${className}`}
        >
            <div className="glass-card p-4">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={320}
                    className="rounded-lg w-full"
                    style={{ background: "#0a0a0a" }}
                />
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="font-mono text-xs text-foreground-muted">33 JOINTS + FINGERS</span>
                    </div>
                    <span className="font-mono text-xs text-teal">FULL-BODY CAPTURE</span>
                </div>
            </div>
        </motion.div>
    );
}
