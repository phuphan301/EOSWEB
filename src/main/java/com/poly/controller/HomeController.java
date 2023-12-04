package com.poly.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	@GetMapping({"","home/index"})
	public String home() {
		return "redirect:/product/list";
	}
	
	@GetMapping({"admin","admin/home/index"})
	public String admin() {
		return "redirect:/assets/admin/index.html";
	}
	
	@GetMapping("/home/profile")
	public String profile() {
		// Lấy thông tin người dùng từ SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Lấy username hoặc principal (đối tượng chứa thông tin người dùng)
        String username = authentication.getName();
        // Hoặc
        Object principal = authentication.getPrincipal();
        
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        boolean isAuthenticated = authentication.isAuthenticated();

        // Thực hiện các xử lý khác với thông tin người dùng
		return "profile/edit";
	}
	
	@GetMapping("/home/changed")
	public String changedpass() {
		return "profile/changed";
	}
	
}
