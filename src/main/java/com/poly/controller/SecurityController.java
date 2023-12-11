package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("security")
public class SecurityController {
	
	@GetMapping("login/form")
	public String loginForm(Model model) {
		model.addAttribute("message", "Please sign in!");
		return "security/login";
	}
	
	@GetMapping("login/success")
	public String loginSuccess(Model model) {
		model.addAttribute("message", "Logged in successfully!");
		return "security/login";
	}
	
	@GetMapping("login/error")
	public String loginError(Model model) {
		model.addAttribute("message", "Wrong login information!");
		return "security/login";
	}
	
	@GetMapping("unauthorized")
	public String unauthorized(Model model) {
		model.addAttribute("message", "No access permissions!");
		return "security/login";
	}
	
	@GetMapping("logoff/success")
	public String logoffSuccess(Model model) {
		model.addAttribute("message", "You're signed out!");
		return "security/login";
	}
	@GetMapping("register/form")
	public String registerForm(Model model) {
		return "security/register";
	}
}
