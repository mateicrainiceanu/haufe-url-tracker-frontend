import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import api from "@/lib/api";
import {useUser} from "@/providers/UserProviders";
import {IUser} from "@/lib/types";
import {useAlert} from "@/providers/AlertProvider";
import {AxiosResponse} from "axios";

enum AuthMode {
	LOGIN,
	REGISTER,
}

const authSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormData = z.infer<typeof authSchema>;

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {
	const [authMode, setAuthMode] = useState(AuthMode.LOGIN);
	const {setUser} = useUser();

	function toggleAuthModeChange() {
		setAuthMode((prev) => (prev == AuthMode.REGISTER ? AuthMode.LOGIN : AuthMode.REGISTER));
	}

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<FormData>({resolver: zodResolver(authSchema)});

	const {handleAxiosError} = useAlert();
	async function onSubmit(data: FormData) {
		const response: AxiosResponse<{user: IUser; token: string}> | void = await api
			.post(authMode == AuthMode.REGISTER ? "/register" : "/login", {email: data.email, password: data.password})
			.catch(handleAxiosError);

		if (!response) return;

		if (authMode === AuthMode.REGISTER ? response.status === 201 : response.status === 200) {
			setUser(response.data.user, response.data.token);
			const lastPath = localStorage.getItem("lastPath");
			localStorage.removeItem("lastPath");
			window.location.replace(lastPath || "/dash");
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="">
					<CardTitle className="text-2xl">
						{authMode == AuthMode.LOGIN ? "Login to your account" : "Sign up for an account"}
					</CardTitle>
					<CardDescription>
						Enter your email below to {authMode == AuthMode.LOGIN ? "login to your" : "create a new"}{" "}
						account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input {...register("email")} type="email" placeholder="m@example.com" required />
								{errors.email && <span>{errors.email.message}</span>}
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									{authMode == AuthMode.LOGIN && <a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
										Forgot your password?
									</a>}
								</div>
								<Input {...register("password")} type="password" required />
								{errors.password && <span className="text-red-600">{errors.password.message}</span>}
							</div>
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full">
									{authMode == AuthMode.REGISTER ? "Sign up" : "Login"}
								</Button>
								<Button variant="outline" className="w-full" onClick={()=> {
									window.location.href = import.meta.env.VITE_API_BASE + "/auth/google";
								}}>
									 Login with Google
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							{authMode == AuthMode.LOGIN ? "Don't have an account?" : "Already have an account?"}{" "}
							<button
								onClick={toggleAuthModeChange}
								className="underline underline-offset-4 hover:underline-offset-2 duration-150">
								{authMode == AuthMode.LOGIN ? "Sign up" : "Login"}
							</button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
