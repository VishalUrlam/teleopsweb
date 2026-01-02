"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function MotionTrackingDemo({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let time = 0;
        let animationId: number;

        // Robot pose matching human (with slight delay for realism)
        const getRobotPose = (t: number) => {
            const delay = t - 0.15; // Slight lag behind human
            const cycle = (delay * 0.15) % 4;

            const head = { x: 0.5, y: 0.08 };
            const neck = { x: 0.5, y: 0.15 };
            const leftShoulder = { x: 0.38, y: 0.19 };
            const rightShoulder = { x: 0.62, y: 0.19 };

            let leftElbow, rightElbow, leftWrist, rightWrist;

            if (cycle < 1) {
                const raise = Math.sin(delay * 2) * 0.5 + 0.5;
                leftElbow = { x: 0.32, y: 0.15 - raise * 0.08 };
                rightElbow = { x: 0.68, y: 0.15 - raise * 0.08 };
                leftWrist = { x: 0.28, y: 0.08 - raise * 0.06 };
                rightWrist = { x: 0.72, y: 0.08 - raise * 0.06 };
            } else if (cycle < 2) {
                const wave = Math.sin(delay * 4) * 0.05;
                leftElbow = { x: 0.28, y: 0.32 };
                leftWrist = { x: 0.22, y: 0.42 };
                rightElbow = { x: 0.72, y: 0.12 };
                rightWrist = { x: 0.78 + wave, y: 0.05 };
            } else if (cycle < 3) {
                leftElbow = { x: 0.22, y: 0.20 };
                rightElbow = { x: 0.78, y: 0.20 };
                leftWrist = { x: 0.08, y: 0.21 };
                rightWrist = { x: 0.92, y: 0.21 };
            } else {
                const cross = Math.sin(delay * 1.5) * 0.5 + 0.5;
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

            // Fingers
            const fingerSpread = Math.sin(delay * 2) * 0.02;
            const leftThumb = { x: leftWrist.x + 0.03, y: leftWrist.y + 0.02 };
            const leftIndex = { x: leftWrist.x - 0.02, y: leftWrist.y + 0.04 };
            const leftMiddle = { x: leftWrist.x - fingerSpread, y: leftWrist.y + 0.045 };
            const leftRing = { x: leftWrist.x + 0.01, y: leftWrist.y + 0.04 };
            const leftPinky = { x: leftWrist.x + 0.025, y: leftWrist.y + 0.035 };
            const rightThumb = { x: rightWrist.x - 0.03, y: rightWrist.y + 0.02 };
            const rightIndex = { x: rightWrist.x + 0.02, y: rightWrist.y + 0.04 };
            const rightMiddle = { x: rightWrist.x + fingerSpread, y: rightWrist.y + 0.045 };
            const rightRing = { x: rightWrist.x - 0.01, y: rightWrist.y + 0.04 };
            const rightPinky = { x: rightWrist.x - 0.025, y: rightWrist.y + 0.035 };

            return {
                head, neck, leftShoulder, rightShoulder, leftElbow, rightElbow,
                leftWrist, rightWrist, spine, leftHip, rightHip, leftKnee,
                rightKnee, leftAnkle, rightAnkle, leftFoot, rightFoot,
                leftThumb, leftIndex, leftMiddle, leftRing, leftPinky,
                rightThumb, rightIndex, rightMiddle, rightRing, rightPinky,
            };
        };

        const drawRobot = (pose: ReturnType<typeof getRobotPose>, offsetX: number, scale: number) => {
            const w = canvas.width;
            const h = canvas.height;

            const toCanvas = (p: { x: number; y: number }) => ({
                x: p.x * w * scale + offsetX,
                y: p.y * h + 15
            });

            const drawMechanicalLimb = (p1: { x: number; y: number }, p2: { x: number; y: number }, width: number = 5) => {
                const c1 = toCanvas(p1);
                const c2 = toCanvas(p2);

                // Main limb
                ctx.beginPath();
                ctx.moveTo(c1.x, c1.y);
                ctx.lineTo(c2.x, c2.y);
                ctx.strokeStyle = "#00c0c0";
                ctx.lineWidth = width;
                ctx.lineCap = "round";
                ctx.stroke();

                // Inner detail
                ctx.beginPath();
                ctx.moveTo(c1.x, c1.y);
                ctx.lineTo(c2.x, c2.y);
                ctx.strokeStyle = "#004040";
                ctx.lineWidth = width * 0.3;
                ctx.stroke();
            };

            // Body
            drawMechanicalLimb(pose.head, pose.neck, 4);
            drawMechanicalLimb(pose.neck, pose.spine, 5);
            drawMechanicalLimb(pose.spine, pose.leftHip, 5);
            drawMechanicalLimb(pose.spine, pose.rightHip, 5);
            drawMechanicalLimb(pose.leftHip, pose.rightHip, 4);
            drawMechanicalLimb(pose.neck, pose.leftShoulder, 4);
            drawMechanicalLimb(pose.neck, pose.rightShoulder, 4);

            // Arms
            drawMechanicalLimb(pose.leftShoulder, pose.leftElbow, 5);
            drawMechanicalLimb(pose.leftElbow, pose.leftWrist, 4);
            drawMechanicalLimb(pose.rightShoulder, pose.rightElbow, 5);
            drawMechanicalLimb(pose.rightElbow, pose.rightWrist, 4);

            // Legs
            drawMechanicalLimb(pose.leftHip, pose.leftKnee, 5);
            drawMechanicalLimb(pose.leftKnee, pose.leftAnkle, 5);
            drawMechanicalLimb(pose.leftAnkle, pose.leftFoot, 3);
            drawMechanicalLimb(pose.rightHip, pose.rightKnee, 5);
            drawMechanicalLimb(pose.rightKnee, pose.rightAnkle, 5);
            drawMechanicalLimb(pose.rightAnkle, pose.rightFoot, 3);

            // Fingers
            ctx.strokeStyle = "#00e0e0";
            const drawFinger = (wrist: { x: number; y: number }, finger: { x: number; y: number }) => {
                const c1 = toCanvas(wrist);
                const c2 = toCanvas(finger);
                ctx.beginPath();
                ctx.moveTo(c1.x, c1.y);
                ctx.lineTo(c2.x, c2.y);
                ctx.lineWidth = 2;
                ctx.stroke();
            };

            drawFinger(pose.leftWrist, pose.leftThumb);
            drawFinger(pose.leftWrist, pose.leftIndex);
            drawFinger(pose.leftWrist, pose.leftMiddle);
            drawFinger(pose.leftWrist, pose.leftRing);
            drawFinger(pose.leftWrist, pose.leftPinky);
            drawFinger(pose.rightWrist, pose.rightThumb);
            drawFinger(pose.rightWrist, pose.rightIndex);
            drawFinger(pose.rightWrist, pose.rightMiddle);
            drawFinger(pose.rightWrist, pose.rightRing);
            drawFinger(pose.rightWrist, pose.rightPinky);

            // Servo joints
            const drawServo = (point: { x: number; y: number }, size: number) => {
                const c = toCanvas(point);
                ctx.beginPath();
                ctx.arc(c.x, c.y, size + 2, 0, Math.PI * 2);
                ctx.fillStyle = "#002828";
                ctx.fill();
                ctx.strokeStyle = "#00d0d0";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(c.x, c.y, size * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = "#00ffff";
                ctx.fill();
            };

            // Body joints
            [pose.neck, pose.leftShoulder, pose.rightShoulder, pose.leftElbow, pose.rightElbow,
            pose.leftWrist, pose.rightWrist, pose.spine, pose.leftHip, pose.rightHip,
            pose.leftKnee, pose.rightKnee, pose.leftAnkle, pose.rightAnkle].forEach(j => drawServo(j, 5));

            // Finger joints (smaller)
            [pose.leftThumb, pose.leftIndex, pose.leftMiddle, pose.leftRing, pose.leftPinky,
            pose.rightThumb, pose.rightIndex, pose.rightMiddle, pose.rightRing, pose.rightPinky].forEach(j => {
                const c = toCanvas(j);
                ctx.beginPath();
                ctx.arc(c.x, c.y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = "#00ffff";
                ctx.fill();
            });

            // Robot head
            const headPos = toCanvas(pose.head);
            ctx.strokeStyle = "#00d0d0";
            ctx.lineWidth = 2;
            ctx.strokeRect(headPos.x - 14, headPos.y - 18, 28, 24);
            ctx.fillStyle = "#002828";
            ctx.fillRect(headPos.x - 12, headPos.y - 16, 24, 20);

            // Eyes
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(headPos.x - 8, headPos.y - 10, 5, 5);
            ctx.fillRect(headPos.x + 3, headPos.y - 10, 5, 5);
        };

        const animate = () => {
            time += 0.025;
            const w = canvas.width;
            const h = canvas.height;

            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, w, h);

            const pose = getRobotPose(time);
            drawRobot(pose, w * 0.25, 0.5);

            // Stats
            ctx.font = "bold 10px JetBrains Mono, monospace";
            ctx.fillStyle = "#00ffff";
            ctx.textAlign = "left";
            ctx.fillText("● EXECUTING", 10, 18);

            ctx.fillStyle = "#94a3b8";
            const latency = 4.2 + Math.sin(time * 3) * 0.3;
            ctx.fillText(`LATENCY: ${latency.toFixed(1)}ms`, 10, 33);
            ctx.fillText("DEXTERITY: 99.7%", 10, 48);

            ctx.textAlign = "right";
            ctx.fillStyle = "#00d0d0";
            ctx.fillText("SYNCED", w - 10, 18);
            ctx.fillStyle = "#94a3b8";
            ctx.fillText("33 JOINTS", w - 10, 33);

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
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-mono text-xs text-foreground-muted">HUMANOID CONTROL</span>
                    </div>
                    <span className="font-mono text-xs text-teal">REAL-TIME TRANSLATION</span>
                </div>
            </div>
        </motion.div>
    );
}
