package com.poly.service.impl;

import java.io.File;
import java.nio.file.Paths;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.poly.service.Service_Upload;

@Service
public class ServiceImpl_Upload implements Service_Upload{

	@Autowired 
	ServletContext app;

	@Override
	public File save(MultipartFile file, String folder) {
		//File dir = Paths.get(app.getRealPath("/assets/"),folder).toFile();
		//File dir= new File(app.getRealPath(folder));
		File dir = new File(app.getRealPath("/assets/"+folder));
		
		if(!dir.exists()) {
			dir.mkdirs();
		}
		String s = System.currentTimeMillis() + file.getOriginalFilename();
		System.out.println("Path: "+s);
		String name = Integer.toHexString(s.hashCode())+ s.substring(s.lastIndexOf("."));
		try {
			File saveFile = new File(dir, name);
			file.transferTo(saveFile);
			System.out.println(saveFile.getAbsolutePath());
			return saveFile;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

}
