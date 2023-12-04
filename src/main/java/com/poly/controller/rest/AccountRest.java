package com.poly.controller.rest;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poly.entity.Account;
import com.poly.service.Service_Account;

@CrossOrigin("*")
@RestController
@RequestMapping("rest")
public class AccountRest {
	@Autowired private Service_Account accountService;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
	@GetMapping("accounts")
	public List<Account>getAccounts(@RequestParam("admin")Optional <Boolean>admin){
		if(admin.orElse(false)) {
			return accountService.getAdministrators();
		}
		return accountService.findAll();
	}
	
	@PostMapping("accountsManage")
	public Account create(@RequestBody Account account) {
		return accountService.create(account);
	}
	
	@PutMapping("accounts/{id}")
	public Account update(@RequestBody Account account,@PathVariable("id")String username) {
		return accountService.update(account);
	}
	@DeleteMapping("accounts/{username}")
	public void delete(@PathVariable("username") String username) {
		accountService.delete(username);
	}
	
	@GetMapping("account/edit")
	public Account getUserLogin() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Lấy username hoặc principal (đối tượng chứa thông tin người dùng)
        String username = authentication.getName();
		return accountService.findById(username);
	}
	
	@PutMapping("account/password")
	public ResponseEntity<String> changePassword(@RequestBody Map<String, String> passwords){
		String oldpassword = passwords.get("oldpassword");
	    String newpassword = passwords.get("newpassword");
	    System.out.println(oldpassword);
	    System.out.println(newpassword);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    Account account = accountService.findById(username);
	    
	 // Kiểm tra mật khẩu cũ
//	    if (!passwordEncoder.matches(oldpassword, account.getPassword())) {
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu cũ không đúng");
//	    }

	    // Kiểm tra mật khẩu mới (nếu có yêu cầu cụ thể)
//	    if (!isValidNewPassword(newpassword)) {
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu mới không hợp lệ");
//	    }
	    
	    // Kiểm tra mật khẩu cũ
	    
//	    if (!passwordEncoder.matches(oldpassword, account.getPassword())) {
//	    	System.out.println(oldpassword);
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu cũ không đúng");
//	    }
	    
	    if(!passwordEncoder.matches(oldpassword, account.getPassword())) {
	    	System.out.println(oldpassword);
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu cũ không đúng");
	    }


	    // Cập nhật mật khẩu mới
	    account.setPassword(passwordEncoder.encode(newpassword));
	    accountService.create(account);

	    return ResponseEntity.ok("Đổi mật khẩu thành công");
	}
	
	// Hàm kiểm tra xem một chuỗi có được mã hóa bằng BCrypt hay không
	private boolean isBCryptEncoded(String password) {
	    return passwordEncoder.matches(password, password);
	}
	
	// Hàm kiểm tra xem mật khẩu mới có thỏa mãn yêu cầu hay không
	private boolean isValidNewPassword(String newPassword) {
	    // Thêm các điều kiện kiểm tra yêu cầu cho mật khẩu mới
	    // Ví dụ: độ dài, ký tự đặc biệt, chữ hoa, chữ thường, số, v.v.
	    return newPassword.length() >= 8; // Đơn giản cho mục đích minh họa
	}
	
	@GetMapping("accounts/search/{fullname}")
	public List<Account> getAccountByFullname(@PathVariable String fullname) {
		return accountService.findByFullname(fullname);
	}
}
