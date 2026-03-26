import { Request, Response } from 'express';
import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore();

class CMSController {
  // Add new content to Firestore
  async createContent(req: Request, res: Response) {
    try {
      const contentData = req.body;
      const docRef = await firestore.collection('cms_content').add(contentData);
      res.status(201).json({ id: docRef.id, ...contentData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update existing content in Firestore
  async updateContent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contentData = req.body;
      await firestore.collection('cms_content').doc(id).set(contentData, { merge: true });
      res.status(200).json({ id, ...contentData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fetch published content from Firestore
  async getPublishedContent(req: Request, res: Response) {
    try {
      const snapshot = await firestore.collection('cms_content').where('status', '==', 'published').get();
      const publishedContent = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(publishedContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fetch content by slug from Firestore
  async getContentBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const snapshot = await firestore.collection('cms_content').where('slug', '==', slug).get();
      if (snapshot.empty) {
        return res.status(404).json({ error: 'Content not found' });
      }
      const content = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete content from Firestore
  async deleteContent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await firestore.collection('cms_content').doc(id).delete();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default CMSController;