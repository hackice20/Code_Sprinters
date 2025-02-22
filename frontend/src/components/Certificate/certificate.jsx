import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import img from "/assets/Certificate.png";
import { useParams } from "react-router-dom";

const generateCertificate = (name, course) => {
  const doc = new jsPDF();

  // Ensure the image is loaded correctly
  if (img) {
    doc.addImage(
      img,
      "PNG",
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight()
    );
  } else {
    console.error("Certificate image not found!");
  }

  // Add recipient name
  doc.setFontSize(36);
  doc.setFont("helvetica", "normal");
  doc.text(name || "No Name", 105, 160, { align: "center" });

  // Add course name
  doc.setFontSize(20);
  doc.text(course || "No Course", 105, 195, { align: "center" });

  doc.save(`${name}-${course}.pdf`);
};

function CertificateGenerator() {
  const token = sessionStorage.getItem("token");
  const [name, setName] = useState("");
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3000/api/quiz/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch quiz (${response.status})`);
      }
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      setError(error.message || "Failed to load quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setName(data.user.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getUser();
  }, [token]);

  useEffect(() => {
    if (id) getQuiz();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button className="pt-5"
        onClick={() => generateCertificate(name, quiz?.title)}
        disabled={!name || !quiz?.title}
      >
        Generate Certificate
      </button>
    </div>
  );
}

export default CertificateGenerator;
