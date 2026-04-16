import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../Header";
import { useState } from "react";

function LoginCard() {
  const [invalidUser, setInvalidUser] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function validate(data) {
    try {
      const response = await fetch("https://butcher-manager.onrender.com/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {

        const data = await response.json();

        const token = data.token;

        sessionStorage.setItem("token", token);

        navigate("/lista-carnes");
      } else {
        setInvalidUser(true);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setInvalidUser(true);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen gap-15 mt-10">
      <Header size={"h-56"} />
      <form
        onSubmit={handleSubmit(validate)}
        className="
        w-96
        p-8
        flex
        flex-col
        gap-6
        rounded-3xl
        bg-white/150
        backdrop-blur-lg
        border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        hover:shadow-[0_20px_80px_rgba(220,38,38,0.35)]
        transition"
      >
        <div className="flex flex-col w-full gap-1 justify-center">
          <input
            className="
            w-full
            p-3
            rounded-xl
            bg-white/150
            border border-white/30
            text-white
            placeholder-white/50
            outline-none
            focus:ring-2
            focus:ring-red-500
            focus:border-red-500
            transition"
            placeholder="Usuário"
            {...register("username", {
              required: "Campo Obrigatório",
              onChange: () => invalidUser(false),
            })}
          />
          <div className="pl-2 h-5 text-red-600">
            {errors.username && errors.username.message}
          </div>
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <input
            type="password"
            className="
            w-full
            p-3
            rounded-xl
            bg-white/180
            border border-white/50
            text-white
            placeholder-white/30
            outline-none
            focus:ring-2
            focus:ring-red-500
            focus:border-red-500
            transition"
            placeholder="Senha"
            {...register("password", {
              required: "Campo Obrigatório",
              onChange: () => setInvalidUser(false),
            })}
          />
          <div className="pl-2 h-5 text-red-600">
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="
          mt-2
          p-3
          rounded-xl
          font-semibold
          text-white
          bg-linear-to-r
          from-red-600
          to-red-700
          hover:from-red-700
          hover:to-red-800
          shadow-lg
          hover:shadow-red-500/40
          transition"
          >
            Entrar
          </button>
          <div className=" text-center mt-2 h-5 text-red-600">
            {invalidUser && "usuário ou senha inválido"}
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginCard;
