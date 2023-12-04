package com.poly.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.poly.dao.Accountdao;
import com.poly.entity.Account;
import com.poly.service.Service_Account;

@Service
public class ServiceImpl_Account implements Service_Account{
	@Autowired private Accountdao accDao;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;

	@Override
	public Account findById(String username) {
		return accDao.findById(username).get();
	}

	@Override
	public List<Account> getAdministrators() {
		return accDao.getAdministrators();
	}

	@Override
	public List<Account> findAll() {
		return accDao.findAll();
	}

	@Override
	public Account create(Account account) {
		account.setExist(true);
		account.setPassword(passwordEncoder.encode(account.getPassword()));
		return accDao.save(account);
	}

	@Override
	public Account update(Account account) {
		return accDao.save(account);
	}
	/*Summary*/

	@Override
	public Long getTotalAccount() {
		return accDao.count();
	}

	@Override
	public List<Object[]> top10Customer() {
		return accDao.top10Customer();
	}

	@Override
	public void delete(String username) {
		accDao.deleteById(username);
		
	}

	@Override
	public List<Account> findByFullname(String username) {
		return accDao.findByFullname(username);
	}

	
}
