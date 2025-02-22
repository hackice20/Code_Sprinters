import CertificateGenerator from "../../components/Certificate/certificate.jsx";

function Certificate({name,  course}) {
  return (
    <div className="text-center">
      <CertificateGenerator name={name} course={course} />
    </div>
  );
}

export default Certificate;
