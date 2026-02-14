export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-12 gap-y-3 w-full bg-white">
      <img
        src="/public/logoInno.png"
        alt="admin image"
        className="w-fit rounded-2xl"
      />
      <h2 className="text-2xl font-bold text-center">Chairat N.</h2>
      <h4 className="text-xl font-bold text-center">Fullstack Developer:</h4>
      <p className="text-center text-base w-full md:w-1/2 mx-auto">
        "Hello! I am the System Administrator for this platform. My goal is to
        ensure you have the best experience possible while using our services.
        Whether you are looking to get started or want to share your thoughts, I
        am here to assist: Sign Up / Feedback / Suggestions <br /><br />
        <strong>Contact: chairatnn@gmail.com</strong>
      </p>

      <footer className="text-center py-10 mt-auto border-t border-gray-50">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          &copy; 2026 Innovate AI - Book Management System
        </p>
      </footer>
    </div>
  );
}
